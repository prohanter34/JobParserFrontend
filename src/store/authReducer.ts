import { PayloadAction, ThunkAction, UnknownAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "./store"
import { authAPI } from "../api/api"


type AuthStateType = {
    me: {
        login: string | null,
        email: string | null,
        resultCode: number,
        changePassResultCode: number,
        hash: string | null,
        verify: boolean | null
    },
}


export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>

const initialState: AuthStateType = {
    me: {
        login: null,
        email: null,
        resultCode: 0,
        changePassResultCode: 0,
        hash: null,
        verify: null
    },
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, login: PayloadAction<string>) => {
            state.me.login = login.payload
        },
        setResultCode: (state, resultCode: PayloadAction<number>) => {
            state.me.resultCode = resultCode.payload
        },
        setAuthHash: (state, hashcode: PayloadAction<string>) => {
            state.me.hash = hashcode.payload
        },
        setEmail: (state, email: PayloadAction<string>) => {
            state.me.email = email.payload
        },

        setState: (state, data: PayloadAction<DataType>) => {
            state.me.login = data.payload.login
            state.me.email = data.payload.email
            state.me.verify = data.payload.verify
        },
        setChangePassResultCode: (state, resultCode: PayloadAction<number>) => {
            state.me.changePassResultCode = resultCode.payload
        },
    }
})

export const {setLogin, setResultCode, setChangePassResultCode, setAuthHash, setEmail, setState} = authSlice.actions

export const loginThunk = (login: string, password: string): AppThunk => (dispatch) => {
    authAPI.loginApi(login, password)
    .then((data) => {
        if (data.data.resultCode === 1000) {
            dispatch(setLogin(login))
            dispatch(setState({
                login: data.data.login,
                email: data.data.email,
                verify: data.data.verify
            }))
            dispatch(setResultCode(data.data.resultCode))
        } else {
            dispatch(setResultCode(data.data.resultCode))
        }
    })
}

export const registerThunk = (login: string, password: string, email: string) => (dispatch: AppDispatch) => {
    authAPI.registerApi(login, email, password)
    .then((response) => {
        dispatch(setResultCode(response.data.resultCode))
        if (response.data.hash) {
            dispatch(setAuthHash(response.data.hash))
            dispatch(setEmail(email))
        }
    })
}

export const verifyEmailThunk = (verifyCode: number, hash: string, email: string) => (dispatch: AppDispatch) => {
    authAPI.verifyEmailApi(verifyCode, hash, email)
    .then((data): void => {
        dispatch(setResultCode(data.data.resultCode))
    })
}

export const authByCookiesThunk = () => (dispatch: AppDispatch) => {
    authAPI.authWithCookies()
    .then((data): void => {
            if (!data.data.resultCode) {
                dispatch(setState({
                    login: data.data.login,
                    email: data.data.email,
                    verify: data.data.verify
                }))
                dispatch(setResultCode(1000))
            } else {
                // приходит 5 в случае стухания токена
                // хардкожу 0 чтобы редиректить на логин без свича по всем резалткодам 
                dispatch(setResultCode(0))
            }
        }
    )
}

export const logoutThunk = () => (dispatch: AppDispatch) => {
    authAPI.logoutApi()
    .then((data) => {
        dispatch(setResultCode(data.data.resultCode))
        dispatch(setLogin(''))
        dispatch(setEmail(''))
    })
}

// export const depositThunk = (deposit: number, promoState: PromoStateType) => (dispatch: AppDispatch) => {
//     cashAPI.depositCashApi(deposit, promoState.promo)
//     .then((data) => {
//         if (data.data.resultCode === 103) {
//             dispatch(changeCash(deposit * promoState.promocodeCoefficient))
//         } else if (data.data.resultCode === 5) {
//             dispatch(authByCookiesThunk())
//             dispatch(depositThunk(deposit, promoState))
//         }
//     })
// }

// export const checkPromocodeThunk = (code: string) => (dispatch: AppDispatch) => {
//     cashAPI.checkPromoCode(code)
//     .then((data) => {
//         if (data.data.resultCode === 103) {
//             dispatch(setPromoCodCoefficient(data.data.coefficient))
//             dispatch(setPromo(code))
//         } else if (data.data.resultCode === 12) {
//             // возможно нужен отдельный resultCode
//             // нехорошо так делать
//             dispatch(setPromoCodCoefficient(-1))
//         }
//     })
// }

export const changePasswordThunk = (oldPassword: string, newPassword: string) => (dispatch: AppDispatch) => {
    authAPI.changePassword(oldPassword, newPassword)
    .then((data) => {
        if (data.data.resultCode === 5) {
            dispatch(authByCookiesThunk())
            dispatch(changePasswordThunk(oldPassword, newPassword))
        } else if (data.data.resultCode === 2) {
            // неверный старый пароль
            dispatch(setChangePassResultCode(2))
        } else if (data.data.resultCode === 103){
            // смена успешна
            dispatch(setChangePassResultCode(1))
        }
    })
}

export default authSlice



type DataType = {
    login: string
    email: string
    verify: boolean
}