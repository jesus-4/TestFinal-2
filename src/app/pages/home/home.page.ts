import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonItem, IonCheckbox, IonCard, IonCardHeader, IonCardContent, IonLabel } from '@ionic/angular/standalone';
import { TaskService } from 'src/app/services/task-service';
import { TaskModel } from 'src/app/model/task-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonList, IonItem, IonCheckbox, IonCard, IonCardHeader, IonCardContent, IonLabel]
})
export class HomePage implements OnInit {
  private ts = inject(TaskService);

  public tasks = signal <TaskModel[]>([]);

  ngOnInit() {
    this.loadTasks()
    // this.ts.getallTasks();
    // this.tasks= this.ts.tasks;
  }
  loadTasks(){
    this.ts.getallTasks().subscribe(
      t => this.tasks.set(t)
    )
  }

  setColor(prioridad: string) {
    switch(prioridad){
      case "alta":
        return "danger";
      case "media":
        return "warning";
      case "baja":
        return "success";
      default:
        return '';
    }
  }

  onChange(t: TaskModel){
    this.ts.putTask({...t, completada: !t.completada}).subscribe(()=>
      {console.log("Tarea actualizada"),
      this.loadTasks()}
    )
  }

  taskStatus(t: TaskModel){
    return t.completada;
  }
}
