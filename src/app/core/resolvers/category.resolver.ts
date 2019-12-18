import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ICategory } from '~/app/models/category';
import { CoreModule } from '../core.module';

@Injectable({ providedIn: CoreModule })
export class CategoryResolver implements Resolve<ICategory> {
	resolve(route: ActivatedRouteSnapshot): Observable<ICategory> {
		return;
	}
}