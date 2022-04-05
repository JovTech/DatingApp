import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Member } from '../_models/members';



@Injectable({
  providedIn: 'root'
})
export class MembersService {
  updateMember(member: Member) {
    throw new Error('Method not implemented.');
  }
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(username) {
    return this.http.get<Member>(this.baseUrl + 'users' + username);
  }
}
