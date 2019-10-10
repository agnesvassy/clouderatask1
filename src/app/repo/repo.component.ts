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
  repo: Repo; //class storing repository details as returned by gitHub API
  issue: Issue; //class storing issue details as returned by gitHub API
  reponame: string; //searched repository name
  username: string; //selected repository username

  public active = false;
  public repoClicked = false;
  setClickedRow : Function;
  displayIssues : Function;


  // Repo component's constructor
  constructor(private service: RepoService) {
    // calling gitHub API to search repo
    this.service.getRepoInfo().subscribe(repo => {
      console.log(this.reponame + 'reponame from constr');
      console.log(repo);
      console.log(repo.items[0].id);
      console.log(repo.items.length);
      this.repo = repo;
      //retreiving issues for the first repo
      this.service.updateUser(this.repo.items[0].owner.login);
      // calling gitHub API to seach repo issues
      this.service.getRepoIssues().subscribe(issue => {
        console.log(issue);
        console.log(issue.items[0].id);
        console.log(issue.items.length);
        this.issue = issue;
        this.username = this.repo.items[0].owner.login;
        this.reponame = this.repo.items[0].name;
      });
      // highlighting selected repo
      this.setClickedRow = function(index){
        this.selectedRow = index;
        this.username = this.repo.items[0].owner.login;
        this.reponame = repo.items[index].name;
      };
      // displaying issues for selected repo
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

  // calling gitHub API to search repo
  findRepo(reponame) {
    console.log('in findrepo()');
    this.reponame = reponame;
    this.service.updateRepo(this.reponame);
    this.service.getRepoInfo().subscribe(repo => {
      console.log(repo);
      this.repo = repo;
      //retreiving issues for the first repo
      this.service.updateUser(this.repo.items[0].owner.login);
      // calling gitHub API to seach repo issues
      this.service.getRepoIssues().subscribe(issue => {
        console.log('in getrepoissues');
        console.log(issue);
        console.log(issue.items[0].id);
        console.log(issue.items.length);
        this.issue = issue;
        this.username = this.repo.items[0].owner.login;
        this.reponame = this.repo.items[0].name;
      });
      // highlighting selected repo
      this.setClickedRow = function(index){
        this.selectedRow = index;
        this.username = this.repo.items[0].owner.login;
        this.reponame = repo.items[index].name;
        console.log('reponame from setclickedrow' + this.reponame);
      };
      // displaying issues for selected repo
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

  ngOnInit() {
  }

}
