import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageTask, TaskServiceProxy} from "@shared/service-proxies/service-proxies";
import {MatSnackBar} from "@node_modules/@angular/material/snack-bar";

@Component({
  selector: 'app-chat-task',
  templateUrl: './chat-task.component.html',
  styleUrls: ['./chat-task.component.scss']
})
export class ChatTaskComponent implements OnInit {
  @Input() task: MessageTask;
  @Input() isGived: boolean;
  @Output() isDeleted: EventEmitter<any> = new EventEmitter<any>();

  constructor(private taskServiceProxy: TaskServiceProxy, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  mark(b: boolean) {
    this.taskServiceProxy.setCompleted(this.task.id, b).toPromise().then(t => {
      if (t.isCompleted) {
        this.snack.open('Помечено как выполнено!');
      } else {
        this.snack.open('Помечено как не выполнено!');
      }
      this.task.init(t);
    });
  }

  delete() {
    this.taskServiceProxy.deleteTask(this.task.id).toPromise().then(t => {
      this.isDeleted.emit();
    });
  }
}
