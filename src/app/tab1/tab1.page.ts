import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public myForm: FormGroup;
  public tasks: Task[];
  public task: Task;
  public tarea;

  constructor(private taskService: TaskService, private fb: FormBuilder,
    private fireAuth: AngularFireAuth) {
      this.taskService.getTasks().subscribe(data =>{
        this.tasks = data.map(e =>{
          return{
            ...e.payload.doc.data(),
            /* title: e.payload.doc.data()['title'],
            description: e.payload.doc.data()['description'],
            status: e.payload.doc.data()['status'], */
          } as Task;
        })
      });
      
      //const tareas = Object.values(this.tasks);
    }

  ngOnInit() {
    this.myForm = this.fb.group({
      title: ["", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]{3,50}$/)])],
      description: ["", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]{3,50}$/)])],
    });
  }

  create() {
    this.task = {
      title: this.myForm.controls.title.value,
      description: this.myForm.controls.description.value,
      status: false,
    }
    this.taskService.createTask(this.task);
  }

}
