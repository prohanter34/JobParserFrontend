import { Radio, RadioChangeEvent } from "antd"
import s from "./Auth.module.css"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import Login from "./Login"
import Registration from "./Registration"
import { useSelector } from "react-redux"
import { selectResultCode } from "../../store/selectors"
import VerifyPage from "./VerifyPage"
import SuccessPage from "./SuccessPage"

const Auth = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const resultCode = useSelector(selectResultCode)

    const pickerOnChange = (e: RadioChangeEvent) => {
        navigate(e.target.value)
    }

    const form = location.pathname === "/auth/login" ? <Login resultCode={resultCode} /> : <Registration resultCode={resultCode} />

    if (resultCode === 100) {
        return <VerifyPage resultCode={resultCode} />
    } else if (resultCode === 101) {
        return (
            <SuccessPage />
        )
    } else if (resultCode === 1000) {
        return <Navigate to="/" />
    }

    return (
        <div className={s.container}>
            <div className={s.form_container}>
                <h1>SCAM CASINO</h1>
                <div className={s.picker}>
                    <Radio.Group onChange={pickerOnChange} buttonStyle="solid" size="large" value={location.pathname}>
                        <Radio.Button value="/auth/login">Вход</Radio.Button>
                        <Radio.Button value="/auth/registration">Регистрация</Radio.Button>
                    </Radio.Group>
                </div>
                {form}
            </div>
        </div>
    )
}

export default Auth