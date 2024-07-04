import { Route, Routes } from "react-router-dom"
import Vacancies from "./Vacancies/Vacancies"
import Vacancy from "./Vacancy/Vacancy"
import Login from "../../Auth/Login"
import Registration from "../../Auth/Registration"
import { useDispatch, useSelector } from "react-redux"
import { selectResultCode } from "../../../store/selectors"
import VerifyPage from "../../Auth/VerifyPage"
import SuccessPage from "../../Auth/SuccessPage"
import { useEffect } from "react"
import { authByCookiesThunk } from "../../../store/authReducer"



export const Content = () => {

    const resultCode = useSelector(selectResultCode)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(authByCookiesThunk())
    }, [])

    return (
        <div>

            <Routes>

                <Route path="/" element={<Vacancies isFavoriteMode={false} />} />
                <Route path="/vacancies/favorite" element={<Vacancies isFavoriteMode={true} />} />
                <Route path="/vacancies/:id" element={<Vacancy />} />
                <Route path="/login" element={<Login resultCode={resultCode} />} />
                <Route path="/register" element={<Registration resultCode={resultCode} />} />
                <Route path="/verify" element={<VerifyPage resultCode={resultCode} />} />
                <Route path="/success" element={<SuccessPage />} />

            </Routes>

        </div>
    )
}


export default Content