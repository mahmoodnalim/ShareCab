import { Component, OnInit } from "@angular/core";
import { FeedbackServiceService } from "../feedback-service.service";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.css"]
})
export class FeedbackComponent {
  constructor(private feedbackService: FeedbackServiceService) {}

  // Get these values from the server
  countries = [
    { name: "Sri Lanka" },
    { name: "India" },
    { name: "America" },
    { name: "China" }
  ];

  submit(feedback) {
    this.feedbackService.create(feedback);
  }
}
