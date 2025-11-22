import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectServiceService {
  private baseUrl = 'http://localhost:8080/subject'; // API demo

  constructor(private http: HttpClient) {}

    deleteSubject(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }

  // GET
  getSubjectById(id:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get/`+id);
  }
    getAllRegisterSubjectByUser(type:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get/register-subject-all/${type}`);
  }
  getAllSubject(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get/all`);
  }
  getAllRegisterSubject( dayOfWeek:string,lessonStart:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get/list-register-subject?dayOfWeek=`+dayOfWeek+`&lessonStart=`+lessonStart);
  }
  // POST
  createSubject(post: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, post);
  }
    deleteRegisterSubject(post: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/delete/register-subject`, post);
  }
    registerSubject(subject: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register-subject`, subject);
  }

  // PUT
  updatePost(id: number, post: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/posts/${id}`, post);
  }

  // DELETE
  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/posts/${id}`);
  }
}
