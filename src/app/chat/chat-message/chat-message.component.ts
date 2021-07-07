import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {
  ChannelServiceProxy,
  Emoji,
  MessageDto,
  MessageServiceProxy, TaskServiceProxy,
  UserDto
} from "@shared/service-proxies/service-proxies";
import {MatMenu, MatMenuTrigger} from "@node_modules/@angular/material/menu";
import {MatDialog} from "@node_modules/@angular/material/dialog";
import {ChatPickEmojiComponent} from "@app/chat/chat-pick-emoji/chat-pick-emoji.component";
import {ChatTaskPickerComponent} from "@app/chat/chat-task-picker/chat-task-picker.component";
import {AppSignalrService} from "@app/core/app-signalr.service";
import {AppSessionService} from "@shared/session/app-session.service";
import {MatSnackBar} from "@node_modules/@angular/material/snack-bar";

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() public message: MessageDto;
  @Input() public isExtended: boolean;
  @Input() public users: UserDto[];
  isOver: boolean;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private dialog: MatDialog,
              private service: MessageServiceProxy,
              private mod: AppSignalrService,
              private session: AppSessionService,
              private tasks: TaskServiceProxy,
              private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  onMessageClick(menu: MatMenu) {
    this.trigger.openMenu();
  }

  markAsTask() {
    this.dialog.open(ChatTaskPickerComponent).afterClosed().subscribe(s => {
      if (!s) return;
      this.tasks.markAsTask(this.message.id, s).toPromise().then(t => {
        this.snack.open('Задача добавлена!');
      });
    });
  }

  callEmojiPicker() {
    this.dialog.open(ChatPickEmojiComponent).afterClosed().subscribe(s => {
      if (!s) return;
      this.mod.connection.invoke('addEmoji', this.message, s);
      const emoji = new Emoji();
      emoji.type = s;
      emoji.userId = this.session.userId;
      this.message.emojis.push(emoji);
    });
  }

  getUserNameById(userId: number) {
    return this.users.filter(f => f.id == userId)[0]?.userName;
  }
}
