import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AlertService } from './services/alert.service';

import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [AlertService],
  bootstrap: [AppComponent],
})
export class AppModule { }
