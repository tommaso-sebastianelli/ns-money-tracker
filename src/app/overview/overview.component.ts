import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ICategory } from "../core/models/category";
import { dataProvider } from "../app.module";
import { IDataProvider } from "../core/data-provider";
import { ITransaction } from "../core/models/transaction";
import { ActivatedRoute } from "@angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { ANIMATIONS } from "../shared/animations";

@Component({
    selector: "Overview",
    templateUrl: "./overview.component.html",
    styleUrls: ['./overview.component.scss'],
    animations: ANIMATIONS
})
export class OverviewComponent implements OnInit {
    private _source: ObservableArray<ICategory>;
    private _categories: Array<ICategory>;

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

        // TODO add timeline component
        this.data.getAllTransactions(new Date(2020, 0, 1).valueOf(), new Date(2020, 1, 31).valueOf())
            .subscribe(
                (data: Array<ITransaction>) => {
                    const categories = this._categories
                        .map(c => {
                            c.amount = data
                                .filter(t => t.categoryId === c.id)
                                .map(t => t.amount)
                                .reduce((acc: number, amount: number) => acc + amount, 0);

                            return c;
                        })
                    this._source = new ObservableArray(categories)
                },
                err => console.error(err))
    }
}
