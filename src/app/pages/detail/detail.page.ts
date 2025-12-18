import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonButton, IonModal, IonLabel, IonSelectOption, IonInput, IonMenuButton, IonButtons, IonCheckbox,IonSelect } from '@ionic/angular/standalone';
import { TaskService } from 'src/app/services/task-service';
import { TaskModel } from '../../model/task-model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonInput, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonButton, IonModal, ReactiveFormsModule, IonLabel,IonCheckbox,IonSelect, IonSelectOption, IonMenuButton, IonButtons]
})
export class DetailPage implements OnInit {
  private ts = inject(TaskService);
  private fb =inject(FormBuilder);
  private AlertController= inject(AlertController)
  public form!:FormGroup;
  public isModalOpen=false;
  private selectedTask!:TaskModel;
  public tasks= signal< TaskModel[]>([]);
  ngOnInit() {
    this.loadTasks();
    this.preLoadForm();
  }

  loadTasks(){
    this.ts.getallTasks().subscribe(t => this.tasks.set(t));
  }

  setModalState(state: boolean, t: TaskModel | undefined){
    this.isModalOpen=state;
    if(this.isModalOpen && t){
      this.selectedTask = t
      this.loadForm();
    }
  }

  preLoadForm(){
    this.form = this.fb.group({
      id : [''],
      titulo : [''],
      materia : [''],
      fechaVencimineto : [''],
      prioridad : [''],
      completada : [false],
      descripcion : [''],
    });

  }
  loadForm(){
    this.form.patchValue(this.selectedTask)
  }
  updateTask(){
    const t = this.form.value as TaskModel
    t !== this.selectedTask? this.ts.putTask(t).subscribe(() => {console.log(`task: ${t.titulo} id: ${t.id} actualizada`); this.loadTasks();}): console.log("No se han realizados cambios en la tarea")
  }

  async eliminarTask(id: string){
    const alert= await this.AlertController.create({
      header: 'Confirmacion',
      message:'Esta seguro que desea eliminar la tarea?',
      buttons:[
        {
          text: 'Si',
          handler: () => this.ts.deleteTask(id).subscribe(() => {console.log('Tarea elimnada con exito'); this.loadTasks()})
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    });
    await alert.present()
  }


}
