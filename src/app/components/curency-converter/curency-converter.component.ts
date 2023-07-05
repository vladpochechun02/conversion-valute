import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';

interface currencyRates{
  [key: string]: {
    [key: string]: number;
  }
}

@Component({
  selector: 'app-curency-converter',
  templateUrl: './curency-converter.component.html',
  styleUrls: ['./curency-converter.component.scss']
})

export class CurencyConverterComponent implements OnInit {
  inputTop: number = 1;
  inputBottom: number = 1;

  selectedCurrencies = [ 'uah', 'usd' ]

  exhangeCurrencies: currencyRates = {
    uah: {
      uah: 1,
      usd: 0,
      eur: 0
    },
    usd: {
      usd: 1,
      uah: 0,
      eur: 0
    },
    eur: {
      eur: 1,
      usd: 0,
      uah: 0
    }
  }
  selectedCurrencyTop: string = 'UAH';
  selectedCurrencyBottom: string = 'USD';
  Flags = {
    uah: 'assets/icons/ukraine.png',
    usd: 'assets/icons/dollar.png',
    eur: 'assets/icons/euro.png',
  }
  currentFlags = {
    top: this.Flags.uah,
    bottom: this.Flags.usd
  }

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrency().subscribe((data) => {
      this.exhangeCurrencies['uah']['usd'] = Number(data.rates.USD.toFixed(2));
      this.exhangeCurrencies['uah']['eur'] = Number(data.rates.EUR.toFixed(2));
      this.exhangeCurrencies['usd']['uah'] = Number((1/data.rates.USD).toFixed(2));
      this.exhangeCurrencies['eur']['uah'] = Number((1/data.rates.EUR).toFixed(2));
      this.exhangeCurrencies['usd']['eur'] = Number((data.rates.EUR/data.rates.USD).toFixed(2));
      this.exhangeCurrencies['eur']['usd'] = Number((data.rates.USD/data.rates.EUR).toFixed(2));
      this.inputBottom = this.exhangeCurrencies['uah']['usd'];
    })
  }

  setFlag(event: Event, place: string) {
    const index = (event.target as HTMLSelectElement).selectedIndex;
    if (place == 'top') {
      switch (index) {
        case 0:
          this.currentFlags.top = this.Flags.uah;
          this.selectedCurrencies[0] = 'uah';
          break;
        case 1:
          this.currentFlags.top = this.Flags.usd;
          this.selectedCurrencies[0] = 'usd';
          break;
        case 2:
          this.currentFlags.top = this.Flags.eur;
          this.selectedCurrencies[0] = 'eur';
          break;
      }
      this.exchange('bottom');
    } else {
      switch (index) {
        case 0:
          this.currentFlags.bottom = this.Flags.usd;
          this.selectedCurrencies[1] = 'usd';
          break;
        case 1:
          this.currentFlags.bottom = this.Flags.uah;
          this.selectedCurrencies[1] = 'uah';
          break;
        case 2:
          this.currentFlags.bottom = this.Flags.eur;
          this.selectedCurrencies[1] = 'eur';
          break;
      }
      this.exchange('top');
    }
  }
  exchange(place: string) {
    if (place == 'top') {
      this.inputBottom = this.inputTop*this.exhangeCurrencies[this.selectedCurrencies[0]][this.selectedCurrencies[1]];
    } else {
      this.inputTop = this.inputBottom*this.exhangeCurrencies[this.selectedCurrencies[1]][this.selectedCurrencies[0]];
    }
  }
}