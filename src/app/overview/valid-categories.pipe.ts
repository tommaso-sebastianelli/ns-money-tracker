import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../core/models/category';

@Pipe({
    name: 'validCategories'
})

export class ValidCategoriesPipe implements PipeTransform {
    transform(value: Array<ICategory>, ...args: any[]): any {
        return value.filter(c => c.id > 0 && c.amount > 0.01);
    }
}