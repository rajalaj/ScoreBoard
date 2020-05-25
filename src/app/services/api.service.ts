import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  allScores: Array<any> = [
    {
      name: "Matti",
      score: 123
    },
    {
      name: "Katja",
      score: 135170
    },
    {
      name: "Teppo",
      score: 0
    },
    {
      name: "Pirjo",
      score: 321
    },
    {
      name: "Janne",
      score: 71
    },
    
  ]

  constructor() { }

  addScore(score) {
    this.allScores.push(score)
  }

  getScore() {
    return this.allScores
  }


}
