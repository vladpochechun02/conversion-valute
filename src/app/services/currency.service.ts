import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Response {
  date: string;
  rates: {
    USD: number,
    EUR: number
  }
}

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  currencyUrl: string = 'https://api.exchangerate.host//latest?base=UAH';
  constructor( private request: HttpClient ) {  }

  getCurrency() {
    return this.request.get<Response>(this.currencyUrl);
  }
}
