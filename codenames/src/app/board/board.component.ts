import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordTile, Role } from '../models/word-tile.model';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  tiles: WordTile[] = [];
  teamView: Role | null = null;
  gameOver: boolean = false;
  winner: Role | null = null;
  message: string = '';

  private allWords: string[] = [
    'apple', 'moon', 'pyramid', 'robot', 'jazz', 'snow', 'crystal', 'banana', 'ninja', 'castle',
    'dragon', 'pirate', 'satellite', 'star', 'river', 'mountain', 'piano', 'book', 'forest',
    'light', 'shadow', 'king', 'queen', 'magic', 'code', 'volcano', 'ghost', 'clock', 'beach',
    'desert', 'vampire', 'penguin', 'diamond'
  ];
  protected imageUrl: string = '';

  ngOnInit(): void {
    this.generateBoard();
  }

  generateBoard(): void {
    const shuffledWords = [...this.allWords].sort(() => Math.random() - 0.5).slice(0, 25);

    const roles: Role[] = [
      ...Array(9).fill('red'),
      ...Array(8).fill('blue'),
      ...Array(7).fill('neutral'),
      'assassin'
    ].sort(() => Math.random() - 0.5);

    this.tiles = shuffledWords.map((word, i) => ({
      word,
      role: roles[i],
      revealed: false
    }));

    this.gameOver = false;
    this.winner = null;
    this.message = '';
  }

  reveal(tile: WordTile): void {
    if (this.gameOver || tile.revealed) return;

    tile.revealed = true;

    if (tile.role === 'assassin') {
      this.gameOver = true;
      this.message = `💀 Game Over! The assassin was revealed.`;
      this.imageUrl = 'assets/lose.png';
      return;
    }

    this.checkWinCondition();
  }

  checkWinCondition(): void {
    const redLeft = this.tiles.filter(t => t.role === 'red' && !t.revealed).length;
    const blueLeft = this.tiles.filter(t => t.role === 'blue' && !t.revealed).length;

    if (redLeft === 0) {
      this.winner = 'red';
      this.gameOver = true;
      this.message = '🎉 Red team wins!';
      this.imageUrl = 'assets/win.png';
    } else if (blueLeft === 0) {
      this.winner = 'blue';
      this.gameOver = true;
      this.message = '🎉 Blue team wins!';
      this.imageUrl = 'assets/win.png';
    }
  }


  toggleView(team: Role): void {
    this.teamView = this.teamView === team ? null : team;
  }

  getColor(tile: WordTile): string {
    if (!tile.revealed && this.teamView !== tile.role) return 'gray';
    switch (tile.role) {
      case 'red': return 'red';
      case 'blue': return 'blue';
      case 'neutral': return 'tan';
      case 'assassin': return 'black';
    }
  }

  restart(): void {
    this.generateBoard();
  }
}
