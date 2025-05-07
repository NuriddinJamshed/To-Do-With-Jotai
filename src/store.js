import {atom} from 'jotai'

export const usersAtom = atom([
    {
        name: "Ali",
        age: "17",
        status: true,
        id: 1
    }
]);

export const modalAdd = atom(false)
export const modalEdit = atom(false)
export const name = atom("")
export const age = atom("")
export const status = atom("false")
export const nameEdit = atom("")
export const ageEdit = atom("")
export const statusEdit = atom("false")
export const idx = atom(null)
export const getId = atom(null)
export const infoBuId = atom({})