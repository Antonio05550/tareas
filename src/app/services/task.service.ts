import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from 'src/app/models/task';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: AngularFirestore, private fireAuth: AngularFireAuth) { }

  getTasks() {
    let currentUser = firebase.auth().currentUser;
    return this.firestore.collection('users').doc(currentUser.uid).collection('tasks').snapshotChanges();
  }

  createTask(task: Task) {
    let currentUser = firebase.auth().currentUser;
    this.firestore.collection('users').doc(currentUser.uid).collection('tasks').add(task);
  }
}
