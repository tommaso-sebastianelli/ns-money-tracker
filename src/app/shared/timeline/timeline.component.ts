import { Component, OnInit, ElementRef, ViewChild, ContentChild, TemplateRef, Output, EventEmitter, AfterViewInit, ViewChildren, Directive, Input, QueryList } from "@angular/core";
import { CalendarService, ICalendarSnapshot } from "../../core/calendar.service";
import { Observable, forkJoin, throwError } from "rxjs";
import { PanGestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { screen } from "tns-core-modules/platform";
import { View } from "tns-core-modules/ui/core/view/view";
import { mergeMap, tap } from "rxjs/operators";
import { Page } from "tns-core-modules/ui/page/page";
import { AnimationCurve } from "tns-core-modules/ui/enums";

@Component({
	selector: "Timeline",
	templateUrl: "./timeline.component.html",
	styleUrls: ["./timeline.component.scss"]
})
export class TimelineComponent implements OnInit {
	@ViewChild("prev", { static: true }) prev: ElementRef;
	@ViewChild("now", { static: true }) now: ElementRef;
	@ViewChild("next", { static: true }) next: ElementRef;
	/**
	 * The Template to be transcluded into timeline view
	 *
	 * @type {TemplateRef<any>}
	 * @memberof TimelineComponent
	 */
	@ContentChild(TemplateRef, { static: false }) outlet: TemplateRef<any>

	/**
	 * The event to be passed on the parent on timeline swipe
	 *
	 * @type {EventEmitter<ICalendarSnapshot>}
	 * @memberof TimelineComponent
	 */
	@Output() timelineChange: EventEmitter<ICalendarSnapshot> = new EventEmitter();

	constructor(// tslint:disable-next-line: align
		public calendarService: CalendarService,
		// tslint:disable-next-line: align
		public page: Page
	) { }

	ngOnInit(): void {
		this.page.on('navigatingTo', () => {
			this.timelineChange.emit(this.calendarService.snapshot);
		});
	}

	public onPan(args: PanGestureEventData): void {
		console.log("Pan: [" + args.deltaX + ", " + args.deltaY + "] state: " + args.state);
		const { deltaX, state } = args;
		const screenWidth = screen.mainScreen.widthDIPs;
		const triggerDragDistance = screenWidth / 2;
		const slideCoeff = (1 / (Math.abs(deltaX) * (screenWidth / 25000)));		
		console.log(slideCoeff);
		if (state === 2) {
			const conf = { translate: { x: deltaX / 2, y: 0 }, duration: 0, opacity: 1 };
			(<View>args.object).animate({ ...conf, translate: { x: deltaX, y: 0 }, opacity: slideCoeff });
			(<View>this.prev.nativeElement).animate(conf);
			(<View>this.now.nativeElement).animate({...conf, scale: {x: 1, y:1}});
			(<View>this.next.nativeElement).animate(conf);
		} else {
			if (state === 3) {
				if (Math.abs(deltaX) > triggerDragDistance) {
					this.changeView(args).subscribe();
				} else {
					this.resetAnimation(args, 250).subscribe();
				}
			}
		}
	}

	/**
	 * Perform a view change animation
	 *
	 * @private
	 * @param {PanGestureEventData} args
	 * @memberof TimelineComponent
	 */
	private changeView(args: PanGestureEventData): Observable<null> {
		return this.slideAnimation(args)
			.pipe(
				tap(() => {
					(args.deltaX < 0) ?
						this.calendarService.nextSnapshot() :
						this.calendarService.previousSnapshot()
				}),
				tap(() => {
					this.timelineChange.emit(this.calendarService.snapshot);
				}),
				mergeMap(() => {
					console.log('transactions loaded, resetting views...');
					return this.resetAnimation(args)
				})
			);
	}

	/**
	 * Translate the view left or right based on the direction
	 *
	 * @private
	 * @param {PanGestureEventData} args
	 * @returns {Observable<any>}
	 * @memberof TimelineComponent
	 */
	private slideAnimation(args: PanGestureEventData): Observable<any> {
		const { deltaX } = args;
		const direction = (deltaX > 0) ? 1 : -1;
		const slideCoeff = screen.mainScreen.widthDIPs;
		const animationConf = { translate: { x: direction * (slideCoeff / 3), y: 0 }, opacity: 1 };
		return forkJoin([
			(<View>this.prev.nativeElement).animate(animationConf),
			(<View>this.now.nativeElement).animate(animationConf),
			(<View>this.next.nativeElement).animate(animationConf),
			(<View>args.object).animate({ translate: { x: direction * slideCoeff, y: 0 } })
		]
		)
	}

	/**
	 *	Reset the view and translate it back to its original position
	 *
	 * @private
	 * @param {*} args
	 * @returns {Observable<null>}
	 * @memberof TimelineComponent
	 */
	private resetAnimation(args, duration = 0): Observable<null> {
		return Observable.create(subscriber => {
			const resetPosition = { translate: { x: 0, y: 0 }, duration: duration, curve: AnimationCurve.easeIn };
			forkJoin([
				(<View>this.prev.nativeElement).animate(resetPosition),
				(<View>this.now.nativeElement).animate(resetPosition),
				(<View>this.next.nativeElement).animate(resetPosition),
				(<View>args.object).animate(resetPosition)
			]).pipe(
				() => {
					const resetAppearance = { scale: { x: 1, y: 1 }, opacity: 1, duration: 0 };
					return forkJoin([
						(<View>this.prev.nativeElement).animate(resetAppearance),
						(<View>this.now.nativeElement).animate({...resetAppearance, scale:{x: 1.3, y:1.3}, duration: 250}),
						(<View>this.next.nativeElement).animate(resetAppearance),
						(<View>args.object).animate({ ...resetAppearance, duration: 150 })
					])
				},
				err => throwError(err)
			).subscribe(
				() => {
					subscriber.next(null);
				}
			)
		});
	}

}
