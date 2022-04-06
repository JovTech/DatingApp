import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../_models/members';
import { User } from 'src/app/_models/user';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { take } from 'rxjs/dist/types/operators';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  loadMember(): any {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })

  }
  member: Member;
  user: User;
  constructor(private accontService: AccountService, private memberService: MembersService) {
    this.accontService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.loadMember();
  }

}
