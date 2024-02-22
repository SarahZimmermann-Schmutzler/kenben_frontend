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


  watchForm() {
    setInterval(() => {
      if (this.new_subtask_title != '' && this.new_subtask_assigned != '' && this.new_subtask_duedate != '') {
        this.formControl = false;
      }
    }, 1000);
  }


  getAssignedValue(user, i, event) {
    if (event.target.checked == true) {
      this.new_subtask_assigned.push(user.id);
    }

    if (event.target.checked == false) {
      this.new_subtask_assigned.splice(i, 1);
    }
  }


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


  getBack() {
    this.router.navigateByUrl('/currentBoard').then(() => {
      window.location.reload();
    });
  }

 
  closeAddSubtask() {
    this.addSubtask.emit(false);
  }


  doNotClose(e: Event) {
    e.stopPropagation();
  }
}