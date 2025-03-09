import { Component, inject, OnInit, signal } from '@angular/core';
import { CommentService } from '../../services/comment/comment.service';
import { Comment } from '../../interfaces/comment';
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipe } from '@angular/common';
import as from '@angular/common/locales/as';



@Component({
  selector: 'app-moderation',
  imports: [DatePipe],
  templateUrl: './moderation.component.html',
  styleUrl: './moderation.component.css'
})
export class ModerationComponent implements OnInit {
  commentService = inject(CommentService);
  comments = signal<Comment[]>([]);
  ngOnInit(): void {
    this.commentService.getComments().subscribe((comments:Comment[]) => {
      this.comments.set(comments);
    });
  }
  // updateComment(id: number, status: Event) {
  // const target = status?.target as HTMLSelectElement;
  // this.comments().map(comment => {
    
  //   if (comment.id === id) {
  //     comment.status = target.value;
  //     this.commentService.updateComment(comment, id).subscribe(comment => {
  //       this.comments.update((comments) => {
  //         return comments.map(c => c.id === id ? comment : c);
  //       });
  //     });
  //   }
  // });
  updateComment(id: number, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newStatus = target.value;
  
    // Trouver directement le commentaire à mettre à jour
    const commentToUpdate = this.comments().find(comment => comment.id === id);
    
    if (commentToUpdate) {
      commentToUpdate.status = newStatus;
  
      this.commentService.updateComment(commentToUpdate, id).subscribe({
        next: (updatedComment) => {
          // Met à jour directement le commentaire dans le tableau
          this.comments.update((comments) => 
            comments.map(c => c.id === id ? updatedComment : c)
          );
        },
        error: (error) => {
          console.error(`Erreur lors de la mise à jour du commentaire: ${error.message}`);
          // Optionnel : Undo local en cas d'erreur
          commentToUpdate.status = commentToUpdate.status; 
        }
      });
    }
  }
  deleteComment(id: number): void {
    this.commentService.deleteComment(id).subscribe(() => {
      this.comments.update((comments) => comments.filter(c => c.id !== id));
    });
  }
}

