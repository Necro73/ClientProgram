import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@node_modules/@angular/material/dialog";
import {ChannelServiceProxy, UserDto, UserServiceProxy} from "@shared/service-proxies/service-proxies";
import {MatSnackBar} from "@node_modules/@angular/material/snack-bar";
import {AppSessionService} from "@shared/session/app-session.service";

@Component({
  selector: 'app-chat-task-picker',
  templateUrl: './chat-task-picker.component.html',
  styleUrls: ['./chat-task-picker.component.scss']
})
export class ChatTaskPickerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ChatTaskPickerComponent>,
              private service: ChannelServiceProxy,
              private _snackBar: MatSnackBar,
              private user: UserServiceProxy,
              private serviceApp: AppSessionService) { }

  users: UserDto[];
  selectedUser: UserDto;
  ngOnInit(): void {
    this.user.getAllUsers().toPromise().then(t => {
      this.users = t;//.filter(item => this.serviceApp.userId != item.id);;
    });
  }

  addUser() {
    if (this.selectedUser != null) {
      this.dialogRef.close(this.selectedUser.id);
    }
  }
}
