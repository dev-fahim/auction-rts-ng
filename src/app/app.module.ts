import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';

import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {FormsModule} from "@angular/forms";

const config: SocketIoConfig = {
  url: 'http://10.12.152.153:5050',
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
