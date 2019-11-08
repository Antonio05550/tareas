import { Injectable } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../models/user';
import {auth} from 'firebase/app';
  import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public isLogged: any = false;
  
  constructor(public afAuth: AngularFireAuth, private afsAuth: AngularFireAuth) { 
    afAuth.authState.subscribe(user => (this.isLogged=user));    
  }

  //register
  async onRegister(user:User){
    try{
      return await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      )
    } catch (error){
      console.log('error on register', error)
    }
  }

  async onLogin(user:User){
    try{
      return await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password)
    }catch (error){
      console.log('error en login', error);
    }
  }

  loginGitUser(){
    return this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider());
  }
  loginGoogleUser(){
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}
