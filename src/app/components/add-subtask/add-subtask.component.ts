import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-subtask',
  templateUrl: './add-subtask.component.html',
  styleUrls: ['./add-subtask.component.scss']
})
export class AddSubtaskComponent {
  @Input() ticketId;
}
