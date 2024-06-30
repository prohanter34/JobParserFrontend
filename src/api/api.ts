import axios from "axios";
import { SearchFilterType, VacanciesStateType, VacancyType } from "../store/vacanciesReduser";


const instance = axios.create({
    baseURL: "http://localhost:8000/",
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
})

export const authAPI = {
    loginApi: (login: string, password: string) => {
        return instance.post<LoginResponseType>("auth/login", {login, password})
    },
    registerApi: (login: string, email: string, password: string) => {
        return instance.post("auth/registration", {login, email, password})
    },
    logoutApi: () => {
        return instance.delete<ResultCodeResponseType>("auth/logout")
    },
    verifyEmailApi: (code: number, hashcode: string, email: string) => {
        return instance.post("auth/registration/verify", {code, hashcode: String(hashcode), email})
    },
    authWithCookies: () => {
        return instance.get<LoginResponseType>("auth")
    },
    changePassword: (oldPassword: string, newPassword: string) => {
        return instance.post<ResultCodeResponseType>("auth/changePass", {oldPassword, newPassword})
    }
}

type LoginResponseType = {
    email: string,
    login: string,
    cash: number,
    verify: boolean,
    resultCode: number
}

type ResultCodeResponseType = {
    resultCode: number
}


export const vacanciesApi = {

    searchVacancies: (filters: SearchFilterType) => {
        const keys = Object.keys(filters);
        const args = keys.map((e: string) => {
            if (filters[e as keyof SearchFilterType]) {
                return `&${e}=${filters[e as keyof SearchFilterType]}`
            }
        })
        debugger
        return instance.get<VacanciesStateType>(`vacancies/search?${args.join('')}`)
    },
    getJob: (id: number) => {
        return instance.get<VacancyType>(`vacancies?id=${id}`)
    }

}

