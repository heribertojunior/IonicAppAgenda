import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthOptions, User } from './auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.authState$ = this.afAuth.authState;
  }

  get isAuthenticated(): Observable<boolean>{
    return this.authState$.pipe(map(user => user !== null));
  }

  authenticate({isSignIn, provider, user}: AuthOptions): Promise<auth.UserCredential>{
    let operation: Promise<auth.UserCredential>;

    operation = isSignIn ? this.signInWithEmail(user) : this.signUPWithEmail(user);

    return operation;
  }

  private readonly newProperty = this;

  logout(): Promise<void>{
    return this.newProperty.afAuth.auth.signOut();
  }

  private signInWithEmail({email, password}: User): Promise<auth.UserCredential>{
    return this.afAuth.auth.signInWithEmailAndPassword(email , password);
  }

  private signUPWithEmail({name, email, password}: User): Promise<auth.UserCredential>{
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      credentials =>
      credentials.user.updateProfile({
        displayName :name , photoURL: null
      }).then(()=> credentials));
  }

}
