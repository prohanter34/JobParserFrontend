import { useNavigate } from "react-router-dom"
import s from "./Auth.module.css"
import { Button } from "antd"
import { useDispatch } from "react-redux"
import { setResultCode } from "../../store/authReducer"


const SuccessPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const homeOnClick = () => {
        dispatch(setResultCode(0))
        navigate("/")
    }

    return (
        <div className={s.container}>
            <div className={s.form_container}>
                <h2>Почта успешно подтверждена</h2>
                <br />
                <Button type="primary" onClick={homeOnClick} size="large">На главную</Button>
            </div>
        </div>
    )
}

export default SuccessPage
