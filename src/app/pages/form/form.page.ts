import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonCheckbox, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { TaskService } from 'src/app/services/task-service';
import { TaskModel } from 'src/app/model/task-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, CommonModule, FormsModule,
    ReactiveFormsModule, IonList, IonItem, IonLabel, IonInput, IonButton, IonCheckbox, IonSelect, IonSelectOption],
})
export class FormPage implements OnInit {
  private fb = inject(FormBuilder);
  private ts = inject(TaskService);
  private router= inject(Router)
  public form!:FormGroup;

  constructor() { }

  ngOnInit() {
    this.loadForm();
  }

  loadForm(){
    this.form = this.fb.nonNullable.group({
      id : [''],
      titulo : [''],
      materia : [''],
      fechaVencimineto : [''],
      prioridad : [''],
      completada : [false],
      descripcion : [''],
    })
  }

  onSubmit(){
    const t = this.form.value as TaskModel;
    const task: TaskModel = {
      id : undefined,
      titulo : t.titulo,
      materia: t.materia,
      fechaVencimineto: t.fechaVencimineto,
      prioridad: t.prioridad,
      completada: t.completada,
      descripcion: t.descripcion
    }

    this.ts.addTask(task).subscribe(() =>{
      this.router.navigateByUrl('/home')}
    );
  }

  onCancel(){
    this.router.navigateByUrl('/home')
    this.loadForm()
  }

}
