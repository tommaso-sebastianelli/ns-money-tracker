import { Injectable } from "@angular/core";

export interface ICalendarSnapshot {
    previous: Date;
    now: Date;
    next: Date;
}

@Injectable({
    providedIn: "root"
})
export class CalendarService {

    private _snapshot: ICalendarSnapshot;

    constructor() {
        const date = new Date();
        date.setDate(1);
        date.setHours(0, 0, 0, 0);

        const next: Date = new Date(date);
        const prev: Date = new Date(date);

        next.setMonth(date.getMonth() + 1);
        prev.setMonth(date.getMonth() - 1);

        this._snapshot = {
            previous: prev,
            now: date,
            // tslint:disable-next-line: object-literal-shorthand
            next: next
        };
    }

    get snapshot(): ICalendarSnapshot {
        return this._snapshot;
    }

    /**
     * update the CalendarSnapshot sliding a month forward
     *
     * @memberof CalendarService
     */
    nextSnapshot(): void {
        const { now, next } = this._snapshot;
        const newNext = new Date(now);
        newNext.setMonth(next.getMonth() + 1);
        this._snapshot.previous = now;
        this._snapshot.now = next;
        this._snapshot.next = newNext;
    }

    /**
     * update the CalendarSnapshot sliding a month backward
     *
     * @memberof CalendarService
     */
    previousSnapshot(): void {
        const { previous, now } = this._snapshot;
        const newPrev = new Date(now);
        newPrev.setMonth(previous.getMonth() - 1);
        this._snapshot.next = now;
        this._snapshot.now = previous;
        this._snapshot.previous = newPrev;
    }

}
