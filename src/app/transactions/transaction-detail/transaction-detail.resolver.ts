import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { dataProvider } from '~/app/app.module';
import { IDataProvider } from '~/app/core/data-provider';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { ITransaction } from '~/app/models/transaction';
import { TransactionsModule } from '../transactions.module';

@Injectable({
	providedIn: TransactionsModule
})
export class TransactionDetailResolver implements Resolve<Observable<ITransaction>> {
	constructor(@Inject(dataProvider) private data: IDataProvider, private router: Router) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITransaction> {
		const id = route.params.id;
		console.log(`resolver: ${id}`)
		return this.data.getTransaction(id)
			.pipe(
				catchError(err => {
					console.error(`resolver: ${err}`);
					return throwError(err);
				}),
				tap(data => {
					console.log(`resolver: ${data}`);					
				})
			)
	}
}