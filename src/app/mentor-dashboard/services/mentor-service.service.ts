import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorServiceService {
  private api:string = 'http://localhost:8081/';
  constructor(private http:HttpClient) { }
  
  getMentorProfile(mentorId:string):Observable<any>{
    return this.http.get(this.api+'api/mentor/profile/'+mentorId);
  }
  updateProfile(payload: any, mentorId: any) {
    return this.http.put(this.api+"api/admin/mentor/"+mentorId,payload)
  }
  changePassword(value: any) {
    return this.http.post(this.api + "api/updatePassword", value);
  }

  getMentorStudents(mentorId:string):Observable<any>{
    return this.http.get(this.api+"api/mentor/student/"+mentorId);
  }

  getGroupsOfMentor(mentorId:string):Observable<any>{
    return this.http.get(this.api+"api/mentor/groups/"+mentorId);
  }
}
