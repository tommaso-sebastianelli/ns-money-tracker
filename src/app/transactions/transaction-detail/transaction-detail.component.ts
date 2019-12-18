import { Component, OnInit, Inject } from '@angular/core';
import { dataProvider } from '~/app/app.module';
import { IDataProvider } from '~/app/shared/data-provider';
import { of } from 'rxjs/internal/observable/of';
import { ITransaction } from '~/app/shared/transaction';

@Component({
  selector: 'ns-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  public model: any;
  constructor(@Inject(dataProvider) private data: IDataProvider) { }

  ngOnInit() {
    this.model = {
      name: "test"
    }
  }

}
