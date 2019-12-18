import { Injectable, Inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { ICategory } from '~/app/models/category';
import { CoreModule } from '../core.module';
import { dataProvider } from '~/app/app.module';
import { IDataProvider } from '../data-provider';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: CoreModule })
export class CategoriesResolver implements Resolve<Array<ICategory>> {
	constructor(@Inject(dataProvider) private data: IDataProvider, private router: Router) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<ICategory>> {
		return this.data.getAllCategories()
			.pipe(
				catchError(err => {
					console.error(`resolver: ${err}`);

					return throwError(err);
				}),
				tap(data => {
					if (!data) {
						throwError("no categories!");
					}
				})
			)
	}
}