import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SubtasksService } from 'src/app/services/subtasks.service';

@Component({
  selector: 'app-add-subtask',
  templateUrl: './add-subtask.component.html',
  styleUrls: ['./add-subtask.component.scss']
})
export class AddSubtaskComponent {
  @Output() addSubtask = new EventEmitter()
  @Input() ticketId;
  @Input() allUsers = 'allUsers';
  new_subtask_title = '';
  new_subtask_duedate = '';
  formControl = true;
  new_subtask_assigned: any = [];
  user;


  constructor(public subtasksService: SubtasksService, private router: Router) { }

  ngOnInit() {
    this.watchForm();
  }

  // activates button after formdata is given 
  watchForm() {
    setInterval(() => {
      if (this.new_subtask_title != '' && this.new_subtask_assigned != '' && this.new_subtask_duedate != '') {
        this.formControl = false;
      }
    }, 1000);
  }


  // checks which users are added to the new subtask
  getAssignedValue(user, i, event) {
    if (event.target.checked == true) {
      this.new_subtask_assigned.push(user.id);
    }

    if (event.target.checked == false) {
      this.new_subtask_assigned.splice(i, 1);
    }
  }


  // creates a new subtask
  async createSubtask() {
    try {
      let resp = await this.subtasksService.createSubtask(
        this.new_subtask_title,
        this.new_subtask_assigned,
        this.new_subtask_duedate,
        this.ticketId,
      );
      this.getBack();
    } catch (e) {
      console.error(e);
    }
  }


  // navigates back to the current-board-page
  getBack() {
    this.router.navigateByUrl('/currentBoard').then(() => {
      window.location.reload();
    });
  }


  // closes the add-subtask-popup
  closeAddSubtask() {
    this.addSubtask.emit(false);
  }


  // prevents closing popup by clicking on formular
  doNotClose(e: Event) {
    e.stopPropagation();
  }
}