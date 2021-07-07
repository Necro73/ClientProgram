import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ChannelServiceProxy, UserDto, UserServiceProxy} from "../../shared/service-proxies/service-proxies";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppSessionService} from "@shared/session/app-session.service";

@Component({
  selector: 'app-chat-add-user',
  templateUrl: './chat-add-user.component.html',
  styleUrls: ['./chat-add-user.component.scss']
})
export class ChatAddUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ChatAddUserComponent>,
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
