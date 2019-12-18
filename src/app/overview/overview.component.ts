import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Overview",
	templateUrl: "./overview.component.html",
	styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }
}
