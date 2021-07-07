import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserDto} from "@shared/service-proxies/service-proxies";
import {AppAuthService} from "@shared/auth/app-auth.service";
import {AppSessionService} from "@shared/session/app-session.service";

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.scss']
})
export class ChatUserComponent implements OnInit {
  @Input() public user: UserDto;
  @Output() public dmTrigger: EventEmitter<any> = new EventEmitter();
  constructor(private appSessionService: AppSessionService) { }

  ngOnInit(): void {
  }

  goToDM() {
    this.dmTrigger.emit();
  }

  isYou() {
    return this.user.id == this.appSessionService.userId;
  }
}
