import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Repo } from '../repo';
import { Issue } from '../issue';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  private reponame: string;
  private username: string;


  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
      console.log('service is now ready');
      // setting default
      this.reponame = 'clouderatask1';
      this.username = 'agnesvassy';
      console.log('Default reponame:'+this.reponame+', username:'+this.username);
    }
    // calling gitHub Repo Api service
    getRepoInfo (): Observable<Repo> {
      console.log('https://api.github.com/search/repositories?q=' + this.reponame);
      return this.http.get<Repo>('https://api.github.com/search/repositories?q=' + this.reponame)
      .pipe(
        tap(_ => this.log('fetched repo')),
        catchError(this.handleError<Repo>('getRepoInfo', ))
      );
    }
    // calling gitHub Issue Api service
    getRepoIssues(): Observable<Issue> {
      console.log('https://api.github.com/search/issues?q=repo:' + this.username + '/' + this.reponame);
      return this.http.get<Issue>('https://api.github.com/search/issues?q=repo:' + this.username + '/' + this.reponame)
      .pipe(
        tap(_ => this.log('fetched issue')),
        catchError(this.handleError<Issue>('getRepoIssues', ))
      );
    }

    updateRepo(reponame: string) {
      this.reponame = reponame;
    }

    updateUser(username: string) {
      this.username = username;
    }


    /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log('${operation} failed: ${error.message}');

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

    /** Log a Service message with the MessageService */
    private log(message: string) {
      this.messageService.add('RepoService: ${message}');
    }
  }
