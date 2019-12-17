import { Component, OnInit, Inject } from '@angular/core';
import { dataProvider } from '~/app/app.module';
import { IDataProvider } from '~/app/shared/data-provider';
import { of } from 'rxjs/internal/observable/of';

export class Model{
  private name: string;
  constructor(name){
    this.name = name;
  }
}

@Component({
  selector: 'ns-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  // styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

  public model: any;
  constructor(@Inject(dataProvider) private data: IDataProvider) { }

  ngOnInit() {
    this.model = new Model("pippo");
  }

}
