import type { ICell, IField } from 'src/interfaces';
import random from 'lodash.random';
export class Field implements IField {

  public cells: ICell[][] = [];

  constructor(private readonly _colCount: number, private readonly _rowCount: number) {
    for (let row = 0; row < _rowCount; row++) {
      for (let col = 0; col < _colCount; col++) {
        if (!this.cells[row]) {
          this.cells[row] = [];
        }
        this.cells[row].push({
          row,
          col,
          state: 'closed',
          minesCount: 0,
          danger: false
        });
      }
    }
    this.generateMines();
    this.calculateMinesCount();
  }

  private getRandomCell(): ICell {
    const randomCol = random(0, this.colCount-1);
    const randomRow = random(0, this.rowCount-1);
    const cell = this.cells?.[randomRow]?.[randomCol];
    if (!cell) {
      return this.getRandomCell();
    }
    return cell;
  }

  public getCellsAround(row: number, col: number): ICell[] {

    const result: ICell[] = [];
    for (let currentRow = row - 1; currentRow <= row + 1; currentRow++) {
      for (let currentCol = col - 1; currentCol <= col + 1 ; currentCol++) {
        if (currentRow === row && currentCol === col || !this.cells?.[currentRow]?.[currentCol]) {
          continue;
        }
        result.push(this.cells[currentRow][currentCol]);
      }
    }
    return result;
  }

  private calculateMinesCount(): void {

    for (let row = 0; row < this.rowCount; row++) {
      for (let col = 0; col < this.rowCount; col++) {
        const cell = this.cells[row][col];
        if (cell.danger) {
          const cellsAround = this.getCellsAround(row, col);
          for (const cell of cellsAround) {
            cell.minesCount++;
          }
        }
      }
    }
  }

  private generateMines(minesCount: number = 10) {
    for (let index = 0; index < minesCount; index++) {
      const cell = this.getRandomCell();
      cell.danger = true;
    }
  }

  public get colCount() {
    return this._colCount;
  }

  public get rowCount() {
    return this._rowCount;
  }

}