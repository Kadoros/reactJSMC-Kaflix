import { atom, selector } from "recoil";

interface IToDoListState{
    [key: string]: string[];
}

export const todoListState = atom<IToDoListState>({
    key: "todoListState",
    default: {
        to_do: ["1", "2" ],
        doing: ["3", "4"],
        done: ["5"],
    },
});