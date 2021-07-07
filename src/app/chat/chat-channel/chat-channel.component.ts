import {Component, Input, OnInit} from '@angular/core';
import {ChannelDto, UserDto} from "@shared/service-proxies/service-proxies";

@Component({
  selector: 'app-chat-channel',
  templateUrl: './chat-channel.component.html',
  styleUrls: ['./chat-channel.component.scss']
})
export class ChatChannelComponent implements OnInit {
  @Input() public channel: ChannelDto;
  @Input() isSelected: boolean;
  @Input() nameOverride: boolean;
  @Input() name: string;

  constructor() { }

  ngOnInit(): void {
  }

}
