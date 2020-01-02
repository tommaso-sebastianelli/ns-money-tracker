import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ICategory } from "../core/models/category";
import { dataProvider } from "../app.module";
import { IDataProvider } from "../core/data-provider";
import { ITransaction } from "../core/models/transaction";
import { ActivatedRoute } from "@angular/router";
import { Page, View } from "tns-core-modules/ui/page/page";
import { ANIMATIONS } from "../shared/animations";
import { Observable } from "rxjs/internal/Observable";
import { mergeMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { ICalendarSnapshot } from "../core/calendar.service";
import { PanGestureEventData } from "tns-core-modules/ui/gestures/gestures";

@Component({
    selector: "Overview",
    templateUrl: "./overview.component.html",
    styleUrls: ['./overview.component.scss'],
    animations: ANIMATIONS
})
export class OverviewComponent implements OnInit {
    private _source: ObservableArray<ICategory>;
    private _categories: Array<ICategory>;
    private transactions: Observable<Array<ITransaction>>;

    public chartPop: boolean = false;

    constructor(
        @Inject(dataProvider) private data: IDataProvider,
        private route: ActivatedRoute,
        public page: Page,
        public cd: ChangeDetectorRef
    ) { }

    get source(): ObservableArray<ICategory> {
        return this._source;
    }

    get categories(): Array<ICategory> {
        return this._categories;
    }

    ngOnInit(): void {
        this._categories = this.route.snapshot && this.route.snapshot.data && this.route.snapshot.data.categories;

        this.page.on('navigatingTo', (data) => {
            this.chartPop = true;
            this.cd.detectChanges();
        });

        this.page.on('navigatingFrom', (data) => {
            this.chartPop = false;
            this.cd.detectChanges();
        })
    }

    public getIconPath(c: ICategory): string {
        return `~/app/images/${c.icon}.png`;
    }

    public update(snapshot: ICalendarSnapshot) {
        this.transactions = this.data.getAllTransactions(snapshot.now.valueOf(), snapshot.next.valueOf())
            .pipe(
                tap((data: Array<ITransaction>) => {
                    const categories = this._categories
                        .map(c => {
                            c.amount = data
                                .filter(t => t.categoryId === c.id)
                                .map(t => t.amount)
                                .reduce((acc: number, amount: number) => acc + amount, 0);

                            return c;
                        })
                        .filter(c => c.amount > 0);

                    this._source = new ObservableArray(categories);
                }
                ))

    }

    // disable vertical srolling while user swipes the timeline, which caused buggy animations
    public onPan(args: PanGestureEventData) {
        const disable = (args.state === 2) ? true : false;
        console.log(`listview scrolling ${(disable ? 'disabled' : 'enabled')}`);
        (<View>args.object).nativeView.requestDisallowInterceptTouchEvent(disable);
    }
}
