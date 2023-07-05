import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CurencyConverterComponent } from './components/curency-converter/curency-converter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurencyConverterComponent  
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
