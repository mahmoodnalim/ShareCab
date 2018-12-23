import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class FeedbackServiceService {
  constructor(private db: AngularFireDatabase) {}

  create(feedback) {
    return this.db.list("/feedback").push(feedback);
  }
}
