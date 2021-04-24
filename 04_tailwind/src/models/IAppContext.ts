import type { Writable } from "svelte/store";
import type { IElementStore } from "../stores";

export interface IAppContext {
  elementStore: Writable<IElementStore>;
}