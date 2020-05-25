import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  playerPos = 50

  blocks: Array<any> = []
  score = 0
  allScores = []

  spawn: any;
  blockInterval: any;

  speed = 1;

  stopGame: boolean = false

  userInput = null

  showScore: boolean = false

  constructor(public api: ApiService) {
    this.handleInput()
    this.startBlocks()
  }

  ngOnInit() {
  }

  handleInput() {
    document.addEventListener('keydown', (ev) => {
      if (this.stopGame || this.showScore) return
      if (ev.key == "a" && this.playerPos > 5) this.playerPos--
      else if(ev.key == "d" && this.playerPos < 95) this.playerPos++
    })
  }

  startBlocks() {
    const block = {
      top: 0,
      left: Math.floor(Math.random() * 100)
    }
    this.blocks.push(block)
    this.blockInterval = setInterval(() => {
      for (let block in this.blocks) {
        this.blocks[block].top += 1*this.speed
        if (this.blocks[block].top > 98) {
          this.score++
          this.blocks.splice(Number(block), 1)
          this.speed += 0.01
        }
        if (this.blocks[block].top > 90 && this.blocks[block].top < 95 &&
          this.blocks[block].left > (this.playerPos - 5) && this.blocks[block].left < (this.playerPos + 5)) {
          this.gameOver()
        }
      } 
    }, 50)

    this.spawn = setInterval(() => {
      const block = {
        top: 0,
        left: Math.floor(Math.random() * 100)
      }
      this.blocks.push(block)
    }, 350)
  }

  gameOver() {
    clearInterval(this.spawn)
    clearInterval(this.blockInterval)
    setTimeout(() => {
      this.blocks = []
    }, 100)
    this.stopGame = true
  }

  saveScore() {
    const total = {
      score: this.score,
      name: this.userInput
    }

    this.api.addScore(total)
    this.showScore = true
    this.stopGame = false

    this.allScores = this.api.getScore()
    console.log(this.allScores)
  }

  restart() {
    this.score = 0
    this.playerPos = 50
    this.speed = 1;
    this.userInput = null
    this.showScore = false
    this.startBlocks()
  }
}
