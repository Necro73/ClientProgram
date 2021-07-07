import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@node_modules/@angular/material/dialog";

@Component({
  selector: 'app-chat-pick-emoji',
  templateUrl: './chat-pick-emoji.component.html',
  styleUrls: ['./chat-pick-emoji.component.scss']
})
export class ChatPickEmojiComponent implements OnInit {

  constructor(private ref: MatDialogRef<ChatPickEmojiComponent>) { }

  ngOnInit(): void {
  }

  onSelect(s: any) {
    this.ref.close(s.emoji.id);
  }

}
