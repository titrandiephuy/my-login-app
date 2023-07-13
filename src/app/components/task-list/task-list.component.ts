import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  taskObj: Task = new Task();
  taskArr: Task[] = [];
  editTaskValue: string ='';
  /**
   *
   */
  constructor(private crudService: CrudService) {

  }
  ngOnInit(): void {
    this.editTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
    this.crudService.getEvent().subscribe(() => {
      this.getAllTask();
    });

  }

  getAllTask() {
this.crudService.getAllTask().subscribe(res=> {
this.taskArr = res;
},err =>{
  alert('Unable to get list.')
})
  }
deleteTask(etask: Task){
  this.crudService.deleteTask(etask).subscribe(res=> {
    this.ngOnInit();
  },err=>{
    alert('Unable to delete task')
  })
}

triggerEdit(task: Task){
  this.crudService.emitEvent(task);
}
}
