import { RootState } from "./store";


export const selectVacancies = (state: RootState) => {
    return state.vacancies
}

export const selectCurrentVacancy = (state: RootState) => {
    return state.vacancies.current
}