/* eslint-disable @typescript-eslint/restrict-plus-operands */
import {Component, NgZone, OnInit} from '@angular/core';
import {SignalRAspNetCoreHelper} from "@shared/helpers/SignalRAspNetCoreHelper";
import {AppSignalrService} from "@app/core/app-signalr.service";
import {
  ChannelDto,
  ChannelServiceProxy,
  MessageDto,
  MessageServiceProxy, MessageTask, TaskServiceProxy, UserDto, UserServiceProxy
} from "@shared/service-proxies/service-proxies";
import {NewUserInChannelDto} from "@app/models/MessageDto";
import {ChatCreateChannelComponent} from "@app/chat/chat-create-channel/chat-create-channel.component";
import {MatDialog} from "@node_modules/@angular/material/dialog";
import {AppSessionService} from "@shared/session/app-session.service";
import {ChatAddUserComponent} from "@app/chat/chat-add-user/chat-add-user.component";
declare let abp;
declare let chatHub;

@Component({
  selector: 'app-chat-index',
  templateUrl: './chat-index.component.html',
  styleUrls: ['./chat-index.component.scss']
})
export class ChatIndexComponent implements OnInit {
  public generalChannels: string[] = ['Алекс', 'НеАлекс', '1', '2', '3'];
  public directChannels: string[] = ['Алекс', 'НеАлекс', '1', '2', '3'];
  public systemChannels: string[] = ['Алекс', 'НеАлекс', '1', '2', '3'];

  public messages: { [id: number] : MessageDto[]; } = {};
  private connection: any;
  chatLine: string;
  public channels: ChannelDto[];
  public selectedChannel: ChannelDto;

  public users: UserDto[];

  public typeView: 'chat' | 'tasks' | 'givedTasks' = 'chat';
  private allUsers: UserDto[];
  public tasks: MessageTask[];
  public givedTasks: MessageTask[];

  constructor(private mod: AppSignalrService,
              public dialog: MatDialog,
              private channelServiceProxy: ChannelServiceProxy,
              private messageServiceProxy: MessageServiceProxy,
              private appSessionService: AppSessionService,
              private userService: UserServiceProxy,
              private taskServiceProxy: TaskServiceProxy) { }

  ngOnInit(): void {

    this.mod.start('signalr-message').then(t => {
      this.connection = t;
      this.mod.connection = t;
      t.on('getMessage', (arg) => {
        const dto = MessageDto.fromJS(arg);
        this.addMessage(dto);
      });
      t.on('updateMessage', (arg) => {
        const dto = MessageDto.fromJS(arg);
        if (this.messages[dto.channel.id]) {
          const index = this.messages[dto.channel.id].findIndex(f => f.id == dto.id);
          this.messages[dto.channel.id][index].init(dto);
        }
      });
      t.on('newUserInChannel', (arg) => {
        const dto = NewUserInChannelDto.fromJS(arg);
        if (dto.channel.id == this.selectedChannel?.id) {
          this.users.push(dto.userDto);
        }

        if (this.appSessionService.userId != dto.userDto.id) return;
        if (this.channels.filter(f => f.id == dto.channel.id).length == 0) {
          this.channels.push(dto.channel);
        }
        t.invoke('updateChannelsConnection');
      });
    });

    this.loadChannels().then(s => {
      if (s && s.length != 0) {
        this.selectedChannel = s[0];
        this.updateChannel();
      }
    });
  }

  addMessage(messageDto: MessageDto) {
    if (this.channels.filter(f => f.id == messageDto.channel.id).length == 0) {
      this.channels.push(messageDto.channel);
    }
    this.messages[messageDto.channel.id]?.push(messageDto);
  }

  sendMessage() {
    this.connection.invoke('sendMessage', {
      channelId: this.selectedChannel.id,
      content: this.chatLine
    });
    this.chatLine = "";
  }

  Send($event: KeyboardEvent, txt: HTMLTextAreaElement) {
    if ($event.ctrlKey && $event.key === 'Enter') {
      txt.value += '\n';
    } else if ($event.key === 'Enter') {
      $event.preventDefault();
      $event.stopPropagation();
      this.sendMessage();
    }
  }

  isExtended(i: number) {
    //if (i == 0) return true;
    //if (this.messages[i - 1].author.id == this.messages[i].author.id) return false;
    return true;
  }

  callCreateChannelModal() {
    this.dialog.open(ChatCreateChannelComponent, {}).afterClosed()
      .toPromise().then(t => {
        if (t) {
          this.loadChannels();
          this.connection.invoke('updateChannelsConnection');
        }
      });
  }

  loadChannels(): Promise<ChannelDto[]> {
    return this.channelServiceProxy.getAllAvailableChannels().toPromise().then(t => {
      this.channels = t;
      return t;
    });
  }

  public selectChannel(i: number) {
    this.typeView = 'chat';
    this.selectedChannel = this.channels.find(f => f.id == i);
    this.updateChannel();
  }

  isSelectedChannel(i: number) {
    return this.selectedChannel?.id === i;
  }

  private updateChannel() {
    const channel = this.selectedChannel;
    this.channelServiceProxy.getAllUsersByChannel(channel.id).toPromise().then(t => {
      this.users = t;
      if (this.messages[channel.id] == undefined) {
        // init channel
        this.messageServiceProxy.getChannelHistory(channel.id, 2147483646)
          .toPromise().then(t => {
            this.messages[channel.id] = t;
          });
      }
    });
    this.userService.getAllUsers().toPromise().then(t => {
      this.allUsers = t;
    });
  }

  callAddUserModal() {
    this.dialog.open(ChatAddUserComponent, {}).afterClosed()
      .toPromise().then(t => {
        if (!t) return;
        this.connection.invoke('addUserToChannel', {
          channelId: this.selectedChannel.id,
          userId: t
        });
      });
  }

  isAdminOfCurrentChannel() {
    if (!this.selectedChannel) return false;
    return this.appSessionService.userId == this.selectedChannel.admin?.id;
  }

  goToTasks() {
    this.typeView = 'tasks';
    this.selectedChannel = null;
    this.taskServiceProxy.getTasks().toPromise().then(t => {
      this.tasks = t;
    });
  }
  goToGivedTasks() {
    this.typeView = 'givedTasks';
    this.selectedChannel = null;
    this.taskServiceProxy.getGivedTask().toPromise().then(t => {
      this.givedTasks = t;
    });
  }

  getGeneralChannel(channels: ChannelDto[]) {
    return channels?.filter(f => f.admin != null);
  }
  getDMChannels(channels: ChannelDto[]) {
    return channels?.filter(f => f.admin == null);
  }

  getDMChannelName(item: ChannelDto) {
    if (!this.users || !item) return;
    const arr = item.name.split('-');
    let id = -1;
    if (arr[1] == this.appSessionService.userId.toString())
      id = Number(arr[2]);
    else id = Number(arr[1]);

    const user = this.allUsers.find(f => f.id == id);
    return user.userName;
  }

  goToDm(id: number) {
    if (this.channels.filter(f => f.admin == null && f.name.includes(id.toString())).length == 0) {
      this.connection.invoke('createDMChannel', id).then(t1 => {
        this.connection.invoke('updateChannelsConnection');
        this.loadChannels().then(t => {
          const i = this.channels.find(f => f.admin == null && f.name.includes(id.toString()));
          this.selectChannel(i.id);
        });
      });
    } else {
      const i = this.channels.find(f => f.admin == null && f.name.includes(id.toString()));
      this.selectChannel(i.id);
    }
  }
}
