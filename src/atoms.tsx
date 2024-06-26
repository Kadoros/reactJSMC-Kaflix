import { atom, selector } from "recoil";

export interface IToDoState {
    id: number;
    text: string;
}

interface IToDoListState{
    [key: string]: IToDoState[];
}

export const toDoListState = atom<IToDoListState>({
    key: "toDoListState",
    default: {
        to_do: [],
        doing: [],
        done: [],
    },
});

export const isDraggingOverTrashBin = atom<boolean>({
    key: "isDraggingOverTrashBin",
    default: false,

})