import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  currentTaskList: string[] = [];
  currentEditTaskValue = '';

addTask(newTask: string){
  this.currentTaskList.push(newTask);
}
deleteTask(task: string){
  this.currentTaskList.splice(this.currentTaskList.indexOf(task), 1);
}
editTask(task: string){
this.currentEditTaskValue = task;
}
saveEditTask(task: string){
this.currentTaskList[this.currentTaskList.indexOf(this.currentEditTaskValue)] = task;
this.currentEditTaskValue = '';
}
}
