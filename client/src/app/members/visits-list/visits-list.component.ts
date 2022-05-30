import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/_models/members';
import { MembersService } from 'src/app/_services/members.service';
import { Pagination } from '../../_models/pagination';

@Component({
  selector: 'app-visits-list',
  templateUrl: './visits-list.component.html',
  styleUrls: ['./visits-list.component.css']
})
export class VisitsListComponent implements OnInit {
  @Input() member: Member;
  members: Partial<Member[]>;
  predicate = 'Viewed';
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadViews();
  }

  loadViews() {
    this.memberService.getViews(this.predicate, this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadViews();
  }

}
