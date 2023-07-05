import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
 
interface Currency {
  date: string;
  usd: number;
  eur: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  currency: Currency = {
    date: '',
    usd: 0,
    eur: 0
  };
  constructor(private currencyService: CurrencyService) {}
  ngOnInit(): void {
    this.currencyService.getCurrency().subscribe((data) => {
      this.currency.date = data.date;
      this.currency.usd = Number((1/data.rates.USD).toFixed(2));
      this.currency.eur = Number((1/data.rates.EUR).toFixed(2));
    })
  } 
}
