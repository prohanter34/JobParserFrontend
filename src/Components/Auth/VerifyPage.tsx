import { Alert, Button, Input } from "antd"
import s from "./Auth.module.css"
import { ChangeEventHandler, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { verifyEmailThunk } from "../../store/authReducer"
import { RootState } from "../../store/store"
import { selectEmail } from "../../store/selectors"
import { useNavigate } from "react-router-dom"


type PropsType = {
    resultCode: number
}

const VerifyPage = (props: PropsType) => {

    const dispatch = useDispatch<any>()
    const hash = useSelector((state: RootState) => {return state.auth.me.hash})
    const email = useSelector(selectEmail)

    const [verifyCode, setVerifyCode] = useState("")
    const [warning, setWarning] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if (props.resultCode === 101) {
            navigate('/success')
        } else if (props.resultCode === 4) {
            setWarning('Неверный код')
        }
    }, [props.resultCode])

    const inputOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        
        if ((/^\d+$/.test(event.target.value) || !event.target.value) && event.target.value.length !== 7) {
            setVerifyCode(event.target.value)
            if (event.target.value.length === 6 && hash && email) {
                dispatch(verifyEmailThunk(Number(event.target.value), hash, email))
            }
        }
    }

    const verifyOnClick = () => {
        if (verifyCode.length === 6 && hash && email) {
            dispatch(verifyEmailThunk(Number(verifyCode), hash, email))
        }
        if (verifyCode.length < 6) {
            setWarning("Код содержит 6 цифр!")
        }
    }

    let warningElem;
    if (warning) {
        warningElem = <Alert type="error" message={warning} className={s.warning} closable={true} onClose={() => {setWarning("")}}/>
    }

    return (
        <div className={s.container}>
            <div className={s.form_container}>
                <h2>Вам на почту отправлено сообщение <br /> с кодом для подтверждения</h2>
                {warningElem}
                <div className={s.inputs}>
                <Input size="large" className={s.number_input} value={verifyCode} onChange={inputOnChange} />
                </div>
                <Button onClick={verifyOnClick} size="large" type="primary">Подтвердить</Button>
            </div>
        </div>
    )
}

export default VerifyPage