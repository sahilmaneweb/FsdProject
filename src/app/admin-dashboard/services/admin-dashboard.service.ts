import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private apiUrl = 'http://localhost:8081/';

  constructor(private httpClient: HttpClient) { }
  
  getBatches():Observable<any>{
    return this.httpClient.get(this.apiUrl+"api/batch");
  }

  getAllStudent():Observable<any>{
    return this.httpClient.get(this.apiUrl+"api/student");
  }

  addStudent(payload:any){
    return this.httpClient.post(this.apiUrl+"api/admin/student", payload);
  }

  editStudent(payload:any, uid:string){
    return this.httpClient.put(this.apiUrl+"api/admin/student/"+uid, payload);
  }

  deleteStudent(uid:string){
    return this.httpClient.delete(this.apiUrl+"api/admin/student/"+uid);
  }
  

  getAllMentor():Observable<any>{
    return this.httpClient.get(this.apiUrl+"api/admin/mentor");
  }

  addMentor(payload:any):Observable<any>{
    return this.httpClient.post(this.apiUrl+"api/admin/mentor", payload);
  }

  editMentor(payload:any, uid:string):Observable<any>{
    return this.httpClient.put(this.apiUrl+"api/admin/mentor/"+uid, payload);
  }

  deleteMentor(uid:string):Observable<any>{
    return this.httpClient.delete(this.apiUrl+"api/admin/mentor/"+uid);
  }

  getAllGroups():Observable<any>{
    return this.httpClient.get(this.apiUrl+"api/groups");
  }

  getGroupById(groupId:string):Observable<any>{
    return this.httpClient.get(this.apiUrl+"api/groups/"+groupId);
  }

  addGroup(details:any, studentUid: string[]):Observable<any>{
    const payload = {...details, studentUid};
    console.log(payload);
    return this.httpClient.post(this.apiUrl+"api/admin/group", payload);
  }

  deleteGroup(groupId:string):Observable<any>{
    return this.httpClient.delete(this.apiUrl+"api/admin/group/"+groupId);
  }

  editGroup(groupId:string, details:any, studentUid:string[]):Observable<any>{
    const payload: any = {...details,studentUid};
    console.log(payload);
    return this.httpClient.put(this.apiUrl+"api/admin/group/"+groupId, payload);
  }

  getStudentsByBatchAndGroupNull(batchName:string):Observable<any>{
    return this.httpClient.get(this.apiUrl+"api/student/"+batchName+"/null");
  }

  getStudentsByBatchAndGroupNullOrGroupId(batchName:string, groupId:string):Observable<any>{
    return this.httpClient.get(this.apiUrl+"api/student/"+batchName+"/"+groupId+"/null");
  }

  getStudentsByBatch(batch: string):Observable<any> {
    return this.httpClient.get(this.apiUrl+`api/student/${batch}`);
  }

  getAttendanceByBatchAndMonth(batchName: string, date: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}api/attendance/${batchName}/${date}`);
  }

  // ✅ Save or update attendance
  markAttendance(attendanceList: any[]): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}api/attendance/mark`, attendanceList);
  }

  // ⚠️ Clear attendance for the month (Optional - implement in backend)
  clearAttendance(batchName: string, date: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/clear/${batchName}/${date}`);
  }
}
