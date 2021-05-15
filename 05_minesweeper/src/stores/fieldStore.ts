

import { FieldHelper } from "src/helpers";
import type { IField } from "src/interfaces";
import { writable } from "svelte/store";


const fieldStore = () => {
  const fieldHelper = new FieldHelper();
  const { subscribe, set, update } = writable<IField>(fieldHelper.generateField());

  const reset = () => set(fieldHelper.generateField())
  const openCell = (row: number, col: number) => update(f => (fieldHelper.openCell(f, row, col)));
  const toggleMark = (row: number, col: number) => update(f => (fieldHelper.toggleMark(f, row, col)));

  return { subscribe, reset, openCell, toggleMark };
}

export const field = fieldStore();