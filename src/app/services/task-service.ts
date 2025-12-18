import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TaskModel } from '../model/task-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http= inject(HttpClient);
  private apiUrl = 'http://localhost:3000/tasks';
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
