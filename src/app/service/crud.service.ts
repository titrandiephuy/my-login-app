import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Task } from '../model/task';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceUrl: string ='';
  constructor(private http: HttpClient) {
    this.serviceUrl = "http://localhost:3000/tasks"
  }

  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceUrl);
  }
  addTask(task: Task): Observable<Task>{
    return this.http.post<Task>(this.serviceUrl,task);
  }
  editTask(task:Task):Observable<Task>{
    return this.http.put<Task>(this.serviceUrl+"/"+task.id, task);
  }
  deleteTask(task:Task):Observable<Task>{
    return this.http.delete<Task>(this.serviceUrl+"/"+task.id);
  }
  private eventSubject = new Subject<Task>();

  emitEvent(task: Task) {
    this.eventSubject.next(task);
  }

  getEvent(): Observable<Task> {
    return this.eventSubject.asObservable();
  }
}
