import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpClient:HttpClient) { }
  private apiUrl = 'http://localhost:8081/';

  loginUser(payload:any){
    return this.httpClient.post(this.apiUrl+'api/login',payload);
  }
  
}
