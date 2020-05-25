import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  @Input() scoreBoard: Array<any> = []

  @Output() startAgain = new EventEmitter()

  nameSwitch: boolean = false
  pointSwitch: boolean = false

  constructor() { }

  ngOnInit() {
  }

  playAgain() {
    this.startAgain.emit({'start': true})
  }

  filterByName() {
    if(this.nameSwitch) {
      this.scoreBoard.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      })
    }
    else {
      this.scoreBoard.sort(function(a, b){
        if(a.name < b.name) { return 1; }
        if(a.name > b.name) { return -1; }
        return 0;
      })
    }
    this.nameSwitch = !this.nameSwitch
  }

  filterByScore() {
    if (this.pointSwitch) {
      this.scoreBoard.sort(function(a, b){
        if(a.score > b.score) { return -1; }
        if(a.score < b.score) { return 1; }
        return 0;
      })
    }
    else {
      this.scoreBoard.sort(function(a, b){
        if(a.score > b.score) { return 1; }
        if(a.score < b.score) { return -1; }
        return 0;
      })
    }
    this.pointSwitch = !this.pointSwitch
  }

}
