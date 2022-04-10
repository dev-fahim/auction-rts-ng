import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';

import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {FormsModule} from "@angular/forms";
import {environment} from "../environments/environment";

const config: SocketIoConfig = {
  url: environment.production ? 'http://159.203.27.156:5050' : 'http://localhost:5050' ,
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
