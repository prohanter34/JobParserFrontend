import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authReducer";
import vacanciesSlice from "./vacanciesReduser";


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        vacancies: vacanciesSlice.reducer
    },
    // middleware: getDefaultMiddleware =>
    // getDefaultMiddleware({
    //   thunk: {
    //     extraArgument: { serviceApi }
    //   }
    // })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
