import { Component, OnInit, Input } from '@angular/core';

import { Repo } from '../repo';
import { Issue } from '../issue';
import { RepoService } from '../services/repo.service';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {
  repo: Repo;
  issue: Issue;
  reponame: string;
  username: string;

  public active = false;
  public repoClicked = false;
  setClickedRow : Function;
  displayIssues : Function;



  constructor(private service: RepoService) {
    this.service.getRepoInfo().subscribe(repo => {
      console.log(this.reponame + 'reponame from constr');
      console.log(repo);
      console.log(repo.items[0].id);
      console.log(repo.items.length);
      this.repo = repo;
      this.service.updateUser(this.repo.items[0].owner.login);
      this.service.getRepoIssues().subscribe(issue => {
        console.log(issue);
        console.log(issue.items[0].id);
        console.log(issue.items.length);
        this.issue = issue;
        this.username = this.repo.items[0].owner.login;
        this.reponame = this.repo.items[0].name;
      });

      this.setClickedRow = function(index){
        this.selectedRow = index;
        this.username = this.repo.items[0].owner.login;
        this.reponame = repo.items[index].name;
      };
      this.displayIssues = function(itemnumber){
        console.log('itemnumber' + itemnumber);
        this.service.updateUser(this.repo.items[itemnumber].owner.login);
        this.service.getRepoIssues().subscribe(issue => {

          console.log('ISSUE' + issue);
          console.log(issue.items[0].id);
          console.log('ISSUE ITEM LENGHT'+ issue.items.length);
          this.issue = issue;
          this.username = this.repo.items[itemnumber].owner.login;
          console.log('this username' + this.username);
        });
      }
    }
  )};

  findRepo(reponame) {
    console.log('in findrepo()');
    this.reponame = reponame;
    this.service.updateRepo(this.reponame);
    this.service.getRepoInfo().subscribe(repo => {
      console.log(repo);
      this.repo = repo;

      this.service.updateUser(this.repo.items[0].owner.login);
      this.service.getRepoIssues().subscribe(issue => {
        console.log('in getrepoissues');
        console.log(issue);
        console.log(issue.items[0].id);
        console.log(issue.items.length);
        this.issue = issue;
        this.username = this.repo.items[0].owner.login;
        this.reponame = this.repo.items[0].name;


      });
      // for(let i=0; i<this.repo.items.length; i++) {
      //   console.log(this.repo.items[i].owner.login);
      //   this.service.updateUser(this.repo.items[i].owner.login);
      //   this.service.getRepoIssues().subscribe(issue => {
      //     console.log('fromConstructor issue title:'+issue);
      //     console.log('constr issue items:' + issue.items[i].id);
      //     console.log('constr issue length:'+issue.items.length);
      //     console.log(Object.keys(issue.items[i]));
      //     console.log(Object.values(issue.items[i]));
      //     console.log('issue' + issue);
      //     // this.issues=issue.items[i];
      //     // console.log('issues :'+ this.issues);
      //     console.log('kecskethisissue'+this.issues);
      //   });
      // }
      this.setClickedRow = function(index){
        this.selectedRow = index;
        this.username = this.repo.items[0].owner.login;
        this.reponame = repo.items[index].name;
        console.log('reponame from setclickedrow' + this.reponame);
      };
      this.displayIssues = function(itemnumber){
        this.reponame = repo.items[itemnumber].name;
        console.log('itemnumber' + itemnumber);
        console.log('reponame from displayissues' + reponame);
        this.service.updateUser(this.repo.items[itemnumber].owner.login);
        this.service.updateRepo(this.repo.items[itemnumber].name);
        this.service.getRepoIssues().subscribe(issue => {

          console.log('ISSUE' + issue);
          console.log(issue.items[0].id);
          console.log('ISSUE ITEM LENGHT'+ issue.items.length);
          this.issue = issue;
          this.username = this.repo.items[itemnumber].owner.login;
          console.log('this username' + this.username);
        });
      }
    }

  )};

  // displayIssues(itemnumber){
  //   console.log('itemnumber' + itemnumber);
  //   this.service.updateUser(this.repo.items[itemnumber].owner.login);
  //   this.service.getRepoIssues().subscribe(issue => {
  //     console.log('ISSUE' + issue);
  //     console.log(issue.items[0].id);
  //     console.log('ISSUE ITEM LENGHT'+ issue.items.length);
  //     this.issue = issue;
  //     this.username = this.repo.items[itemnumber].owner.login;
  //     console.log('this username' + this.username);
  //   });
  // }




  ngOnInit() {
    // this.reponame = this.service.getRepoName(this.id);

  }

}
