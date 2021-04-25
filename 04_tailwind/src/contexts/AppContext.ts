import { ELEMENT_STORE_KEY } from "common/Constants";
import type { IAppContext } from "models";
import type { IElementStore } from "stores";
import { getContext, setContext } from "svelte";

export const setAppContext = (elementStore: IElementStore) => setContext<IAppContext>(ELEMENT_STORE_KEY, { elementStore });

export const getAppContext = () => getContext<IAppContext>(ELEMENT_STORE_KEY);