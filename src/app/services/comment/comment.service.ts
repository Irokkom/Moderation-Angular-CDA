import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Comment } from '../../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  API_URL: string = environment.apiUrl;
  constructor(private http: HttpClient) {
    
   }
   getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.API_URL}/api/comments`);
   }
   getCommentsByArticleId(articleId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.API_URL}/api/comments/${articleId}`);
   }
   updateComment(comment: Comment, id: number): Observable<Comment> {
    return this.http.put<Comment>(`${this.API_URL}/api/comments/${id}`, comment);
   }
   deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/api/comments/${id}`);
   }
}
