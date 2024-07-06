import { PayloadAction, ThunkAction, UnknownAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "./store"
import { vacanciesApi } from "../api/api"
import { authByCookiesThunk } from "./authReducer"


export type VacanciesStateType = {
    items: Array<VacanciesType>,
    found: number,
    text: string,
    current: VacancyType | null,
    favoriteMode: boolean,

}


export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    UnknownAction
>

const initialState: VacanciesStateType = {
    items: [],
    found: 0,
    text: "",
    current: null,
    favoriteMode: false,

}

export interface VacanciesType {
    id: number,
    name: string,
    isFavorite: boolean,
    salary: {
        from: number | null,
        to: number | null,
    } | null
    area: {
        id: number | null,
        name: string | null
    },
    employer: {
        id: number | null,
        name: string | null,

    },
    experience: {
        id: string,
        name: string,
    } | null,
    schedule: {
        id: string,
        name: string
    } | null,

}

export interface VacancyType extends VacanciesType {
    description: string | null,
    alternate_url: string | null,
    employment: {
        id: string, 
        name: string
    } | null,
    key_skills: Array<{
        name: string
    }>

}

const vacanciesSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setVacancies: (state, vacancies: PayloadAction<Array<VacanciesType>>) => {
            state.items = vacancies.payload
        },
        setFound: (state, found: PayloadAction<number>) => {
            state.found = found.payload
        },
        setText: (state, text: PayloadAction<string>) => {
            state.text = text.payload
        },
        setCurrentVacancy: (state, vacancy: PayloadAction<VacancyType>) => {
            state.current = vacancy.payload
        },
        setFavoriteVacancy: (state, vacancy_id) => {
            state.items.forEach((vacancy) => {
                if (vacancy.id === vacancy_id.payload) {
                    vacancy.isFavorite = true
                }
            })
        },
        unsetFavoriteVacancy: (state, vacancy_id) => {
            state.items.forEach((e) => {
                if (e.id === vacancy_id.payload) {
                    e.isFavorite = false
                }
            })
        },
        switchFavoriteMode: (state) => {
            state.favoriteMode = !state.favoriteMode
        }
    }
})

export const { setVacancies, setFound, setText, setCurrentVacancy, setFavoriteVacancy, 
    unsetFavoriteVacancy, switchFavoriteMode } = vacanciesSlice.actions


export type SearchFilterType = {
    schedule: string | null,
    experience: string | null,
    salary: number | null | undefined,
    only_with_salary: boolean,
    text: string,
    page: number,
    per_page: number
}

export const getVacanciesThunk = (filters:  SearchFilterType) => (dispatch: AppDispatch) => {
    vacanciesApi.searchVacancies(filters)
        .then((data) => {
            const newData = data.data.items.map((e) => {
                const salary = e.salary !== null ? {from: e.salary.from, to: e.salary.to} : null
                return {
                    id: e.id,
                    isFavorite: e.isFavorite,
                    name: e.name,
                    salary: salary,
                    area: e.area,
                    employer: e.employer,
                    experience: e.experience,
                    schedule: e.schedule
                }
            })
            dispatch(setVacancies(newData))
            dispatch(setFound(data.data.found))
            dispatch(setText(filters.text))
        })
}


export const getCurrentVacancy = (id: number) => (dispatch: AppDispatch) => {
    vacanciesApi.getJob(id)
    .then((data) => {
        dispatch(setCurrentVacancy(data.data))
    })
}

export const addFavoriteVacancy = (vacancy_id: number) => (dispatch: AppDispatch) => {
    vacanciesApi.addFavoriteVacancy(vacancy_id)
    .then((data) => {
        if (data.data.resultCode === 103) {
            dispatch(setFavoriteVacancy(vacancy_id))
        } else if (data.data.resultCode === 6) {
            dispatch(authByCookiesThunk())
        } else {

        }
    })
}

export const deleteFavoriteVacancy = (vacancy_id: number) => (dispatch: AppDispatch) => {
    vacanciesApi.deleteFavoriteVacancy(vacancy_id)
    .then((data) => {
        if (data.data.resultCode === 103) {
            dispatch(unsetFavoriteVacancy(vacancy_id))
        } else if (data.data.resultCode === 6) {
            dispatch(authByCookiesThunk())
        } else {
            
        }
    })
}

export const getFavoriteVacancies = () => (dispatch: AppDispatch) => {
    vacanciesApi.getFavoriteVacancies()
    .then((data) => {
        if (data.data.resultCode === 103) {
            const newData = data.data.items.map((e) => {
                e.salary = {
                    to: e.salary_to,
                    from: e.salary_from
                }
                return e
            })
            dispatch(setVacancies(newData))
            dispatch(setFound(data.data.found))
        } else if (data.data.resultCode === 6) {
            // dispatch(authByCookiesThunk())
        } else {

        }
    })
}

export default vacanciesSlice
