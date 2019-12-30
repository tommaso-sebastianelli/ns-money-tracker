import { Component, OnInit, ElementRef, ViewChild, ContentChild, TemplateRef, Output, EventEmitter, AfterViewInit, ViewChildren, Directive, Input, QueryList } from "@angular/core";
import { CalendarService, ICalendarSnapshot } from "../../core/calendar.service";
import { Observable, forkJoin, throwError } from "rxjs";
import { SwipeGestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { View } from "tns-core-modules/ui/core/view/view";
import { mergeMap } from "rxjs/operators";
import { Page } from "tns-core-modules/ui/page/page";

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

	onSwipe(args: SwipeGestureEventData) {
		console.log("Object that triggered the event: " + args.object);
		console.log("View that triggered the event: " + args.view);
		console.log("Event name: " + args.eventName);
		console.log("Swipe Direction: " + args.direction);

		if (args.direction > 2) {
			return;
		}

		let slideTranslateX;
		// backward slide
		if (args.direction === 2) {
			slideTranslateX = -1;
			this.calendarService.nextSnapshot();
		} else {
			slideTranslateX = 1;
			this.calendarService.previousSnapshot();
		}

		console.log('load animations...');
		this.loadAnimations(slideTranslateX, args)
			.pipe(
				// mergeMap(() => {
				// 	console.log('loading transactions...');
				// 	return this.loadTransactions()
				// }),
				mergeMap(() => {
					console.log('transactions loaded, resetting views...');
					this.timelineChange.emit(this.calendarService.snapshot);
					return this.resetAnimations(args)
				})
			).subscribe(
				() => console.log('ok'),
				err => console.error(err),
				() => console.log('complete')
			);
	}

	private loadAnimations(directionIndex: number, args): Observable<any> {
		const animationConf = { translate: { x: directionIndex * 120, y: 0 }, opacity: 0.6 };
		return forkJoin([
			(<View>this.prev.nativeElement).animate(animationConf),
			(<View>this.now.nativeElement).animate(animationConf),
			(<View>this.next.nativeElement).animate(animationConf),
			(<View>args.object).animate({ translate: { x: directionIndex * 500, y: 0 }, opacity: 0, })
		]
		)
	}

	private resetAnimations(args): Observable<null> {
		return Observable.create(subscriber => {
			const resetConf = { translate: { x: 0, y: 0 }, duration: 0 };
			forkJoin([
				(<View>this.prev.nativeElement).animate(resetConf),
				(<View>this.now.nativeElement).animate(resetConf),
				(<View>this.next.nativeElement).animate(resetConf),
				(<View>args.object).animate(resetConf)
			]).pipe(
				() => {
					const resetConf2 = { scale: { x: 1, y: 1 }, opacity: 1, duration: 75 };
					return forkJoin([
						(<View>this.prev.nativeElement).animate(resetConf2),
						(<View>this.now.nativeElement).animate(resetConf2),
						(<View>this.next.nativeElement).animate(resetConf2),
						(<View>args.object).animate(resetConf2)
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
