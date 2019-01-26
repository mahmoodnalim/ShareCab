// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }


// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from 'angularfire2/auth';
// // Do not import from 'firebase' as you'd lose the tree shaking benefits
// import * as firebase from 'firebase/app';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthService1 {

//   user:any;
//   user2:any;

//   constructor(private afAuth: AngularFireAuth) {
//     this.user = afAuth.authState;
//   }

//   login(name){
//     this.afAuth.auth.signInAnonymously().then(()=>{
//       this.afAuth.auth.currentUser.updateProfile({
//         displayName:name,
//         photoURL:"sd"
//       })
//     })
//   }

//   logout(){
//     this.afAuth.auth.signOut();
//   }

// }