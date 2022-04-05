import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/members';
import { User } from 'src/app/_models/user';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { take } from 'rxjs/dist/types/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  toastr: any;
  @ViewChild('editForm')
  editForm!: NgForm;
  member: Member;
  user: User;
  
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }

  loadMember(): any {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })

  }
  constructor(private accontService: AccountService, private memberService: MembersService) {
    this.accontService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.loadMember();
  }

  updateMember(){
    this.memberService.updateMember(this.member).subscribe(() =>{
      this.toastr.success('profile updated successfully');
    this.editForm.reset(this.member);
    })
  }

}
