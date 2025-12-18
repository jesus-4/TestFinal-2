import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { TaskModel } from '../model/task-model';
import { Subscription, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http= inject(HttpClient);
  private apiUrl = 'http://localhost:3000/tasks';

  private allTasks = signal<TaskModel[]>([]);
  public tasks= signal<TaskModel[]>([]);

  // getallTasks() {
  //   this.http.get<TaskModel[]>(this.apiUrl).pipe(
  //     map(task =>
  //     task.map(
  //       t=> ({
  //         ...t, fechaVencimineto: new Date(t.fechaVencimineto).toISOString().split('T')[0]
  //       })
  //     )
  //     ))
  //   .subscribe(t =>{
  //     this.allTasks.set(t);
  //     this.tasks.set(t)
  //   })
  // }
  getallTasks() : Observable<TaskModel[]>{ return this.http.get<TaskModel[]>(this.apiUrl);}
  getTaskById(id : string) : Observable<TaskModel>{ return this.http.get<TaskModel>(`${this.apiUrl}/${id}`);}


  addTask(task: TaskModel): Observable<TaskModel>{
    return this.http.post<TaskModel>(this.apiUrl, task);
  }
  putTask(task: TaskModel): Observable<TaskModel>{
    return this.http.put<TaskModel>(`${this.apiUrl}/${task.id}`, task);
  }
  deleteTask(id: string): Observable<TaskModel>{
    return this.http.delete<TaskModel>(`${this.apiUrl}/${id}`)
  }

}
