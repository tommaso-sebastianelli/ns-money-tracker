import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ICategory } from "../core/models/category";
import { dataProvider } from "../app.module";
import { IDataProvider } from "../core/data-provider";
import { ITransaction } from "../core/models/transaction";
import { ActivatedRoute } from "@angular/router";
import { Page, View } from "tns-core-modules/ui/page/page";
import { ANIMATIONS } from "../shared/animations";
import { tap } from "rxjs/operators";
import { ICalendarSnapshot } from "../shared/timeline/timeline.service";
import { PanGestureEventData } from "tns-core-modules/ui/gestures/gestures";

@Component({
    selector: "Overview",
    templateUrl: "./overview.component.html",
    styleUrls: ['./overview.component.scss'],
    animations: ANIMATIONS
})
export class OverviewComponent implements OnInit {
    public source: ObservableArray<ICategory>;
    public categories: Array<ICategory>;
    public overviewCategories: Array<ICategory> = [];
    public transactions: Array<ITransaction>;
    public chartPop: boolean = false;

    constructor(
        @Inject(dataProvider) private data: IDataProvider,
        private route: ActivatedRoute,
        public cd: ChangeDetectorRef,
        public page: Page
    ) { }

    ngOnInit(): void {
        this.categories = this.route.snapshot && this.route.snapshot.data && this.route.snapshot.data.categories;
        this.transactions = [];
    }

    public loaded() {
        this.chartPop = true;
        this.cd.detectChanges();
        console.log('overview page loaded');
    }

    public unloaded() {
        this.chartPop = false;
        console.log('overview page unloaded');
    }

    public getIconPath(c: ICategory): string {
        return `~/app/images/${c.icon}.png`;
    }

    public update(snapshot: ICalendarSnapshot) {
        console.log('overview updating');

        this.data.getAllTransactions(snapshot.now.valueOf(), snapshot.next.valueOf())
            .pipe(
                tap((transactions: Array<ITransaction>) => {
                    this.transactions = transactions;
                    this.overviewCategories = this.categories
                        .map(c => {
                            c.amount = transactions
                                .filter(t => t.categoryId === c.id)
                                .map(t => t.amount)
                                .reduce((acc: number, amount: number) => acc + amount, 0);

                            c.transactionsTotal = transactions.filter(t => t.categoryId === c.id).length;

                            return c;
                        })

                    // PieChart Bug:
                    // https://github.com/tommaso-sebastianelli/ns-money-tracker/blob/develop/src/app/overview/overview.component.html
                    this.overviewCategories.push(<ICategory>{
                        id: -1,
                        amount: 0.001
                    })

                    this.source = new ObservableArray(this.overviewCategories);
                }
                ))
            .subscribe()
            .unsubscribe();
    }

    // disable vertical srolling while user swipes the timeline, which caused buggy animations
    public onPan(args: PanGestureEventData) {
        const disable = (args.state === 2) ? true : false;
        console.log(`listview scrolling ${(disable ? 'disabled' : 'enabled')}`);
        (<View>args.object).nativeView.requestDisallowInterceptTouchEvent(disable);
    }
}
