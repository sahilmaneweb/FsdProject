import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentDashboardServiceService {
  private apiUrl = 'http://localhost:8081/';
  constructor(private httpClient: HttpClient) { }

  getStudentProfile(uid: string) {
    return this.httpClient.get(this.apiUrl + "api/student/profile/" + uid, );
  }

  updateProfile(payload: any, uid: string) {
    return this.httpClient.put(this.apiUrl + "api/student/" + uid, payload);
  }

  changePassword(payload: any) {
    return this.httpClient.post(this.apiUrl + "api/updatePassword", payload);
  }


  getAttendanceDashboard(){
    return this.httpClient.get(this.apiUrl+"api/attendance/student/dashboard");
  }

  getGroupByStudent(uid:string){
    return this.httpClient.get(this.apiUrl + "api/student/groups/"+uid);
  }
}
