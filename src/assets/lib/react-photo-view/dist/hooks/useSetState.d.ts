/// <reference types="react" />
export default function useSetState<S extends Record<string, any>>(initialState: S): [S & Partial<S>, import("react").ActionDispatch<[action: Partial<S> | ((state: S) => Partial<S>)]>];
