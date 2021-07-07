import { Component, OnInit } from '@angular/core';
import {ChannelServiceProxy} from "@shared/service-proxies/service-proxies";
import {MatSnackBar} from "@node_modules/@angular/material/snack-bar";
import {MatDialogRef} from "@node_modules/@angular/material/dialog";

@Component({
  selector: 'app-chat-create-channel',
  templateUrl: './chat-create-channel.component.html',
  styleUrls: ['./chat-create-channel.component.scss']
})
export class ChatCreateChannelComponent implements OnInit {
  nameChannel: string;

  constructor(public dialogRef: MatDialogRef<ChatCreateChannelComponent>,
              private service: ChannelServiceProxy,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  createChannel() {
    this.service.createNewChannel(this.nameChannel).toPromise().then(t => {
      this._snackBar.open('Создано!', null, {
        duration: 3000,
      });
      this.dialogRef.close(true);
    }).catch(c => {
      this._snackBar.open('Ошибка при создании!', null, {
        duration: 3000,
      });
      this.dialogRef.close();
    });
  }
}
