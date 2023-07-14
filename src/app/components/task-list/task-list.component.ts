import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  @Input() tasks: string[]= [];
  @Output() deleteTaskEvent = new EventEmitter<string>();
  @Output() editTaskEvent = new EventEmitter<string>();

deleteTask(value: string){
this.deleteTaskEvent.emit(value);
}
editTask(value: string){
  this.editTaskEvent.emit(value);
}

  /**
   *
   */
  constructor() {
  }
  ngOnInit(): void {

  }
}
