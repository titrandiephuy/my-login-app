import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.css']
})
export class AddEditTaskComponent {
  @Input() editTaskValue = '';
  @Output() newTaskEvent = new EventEmitter<string>();
  @Output() saveEditTaskEvent = new EventEmitter<string>();

  addTaskValue = "";
    ngOnInit(): void {
    }
    addNewTask(value: string){
      this.newTaskEvent.emit(value);
    }
    saveEditTask(value: string){
      this.saveEditTaskEvent.emit(value);
    }

}
