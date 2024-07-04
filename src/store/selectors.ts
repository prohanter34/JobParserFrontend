import { RootState } from "./store";


export const selectVacancies = (state: RootState) => {
    return state.vacancies
}

export const selectCurrentVacancy = (state: RootState) => {
    return state.vacancies.current
}

export const selectEmail = (state: RootState) => {
    return state.auth.me.email
}

export const selectResultCode = (state: RootState) => {
    return state.auth.me.resultCode
} 

export const selectUserState = (state: RootState) => {
    return state.auth.me
}