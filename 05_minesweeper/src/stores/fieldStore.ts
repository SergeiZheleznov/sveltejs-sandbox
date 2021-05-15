
import type { ICell, IField } from "src/interfaces";
import { Field } from "src/models";
import { writable } from "svelte/store";


const fieldStore = (colCount: number, rowCount: number) => {
  const field = new Field(colCount, rowCount);
  const { subscribe, set, update } = writable<IField>(field);

  const reset = () => {
    const newField = new Field(colCount, rowCount);
    set(newField);
  }

  const openCell = (row: number, col: number) => {
    update(f => {
      f.cells[row][col].state = 'opened';
      return f;
    })
  }

  const markCell = (row: number, col: number) => {
    update(f => {
      const cell = f.cells[row][col];

      cell.state = 'marked';
      return f;
    });
  }

  return {subscribe, reset, openCell, markCell};
}

export const field = fieldStore(10, 10);