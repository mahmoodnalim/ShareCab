// import { Injectable } from '@angular/core';
// import { AuthService1 } from './_auth.service';
// import { AngularFireDatabase, AngularFireListObservable } from "angularfire2/database";
// //import {AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import { Observable } from 'rxjs';
// @Injectable()
// export class DbService {
//   user:any;
//   messages: AngularFireListObservable<any[]>;

//   constructor(private auth: AuthService1, private db: AngularFireDatabase) {
//     auth.user.subscribe((s)=>{
//       this.user = s;
//     });
//     this.messages = db.list('messages');
//   }

//   public pushData(uid,name,message){
//     this.messages.push({"uid":uid,"name":name,"message":message});

//   }

// }
