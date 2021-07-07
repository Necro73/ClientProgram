import { Injectable } from '@angular/core';
import {AppConsts} from "@shared/AppConsts";
import {UtilsService} from "@shared/abp/services/utils/utils.service";
import * as signalR from '@microsoft/signalr';
import {HubConnection} from "@microsoft/signalr";
//declare let signalR;

@Injectable({
  providedIn: 'root'
})
export class AppSignalrService {
  connection: HubConnection;

  constructor() { }

  start(hub: string) {
    const encryptedAuthToken = new UtilsService().getCookieValue(AppConsts.authorization.encryptedAuthTokenName);
    let url = AppConsts.remoteServiceBaseUrl + '/' + hub;
    // Add query string: https://github.com/aspnet/SignalR/issues/680
    url += (url.indexOf('?') == -1 ? '?' : '&') + AppConsts.authorization.encryptedAuthTokenName + '=' + encodeURIComponent(encryptedAuthToken);
    //abp.appPath
    console.log('StartConnection');
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(url, {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true
      })
      .build();

    return connection.start().then(() => connection);
  }
}
