import { Alert, Button, Form, Input } from "antd"
import s from "./Auth.module.css"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { registerThunk } from "../../store/authReducer"
import { useNavigate } from "react-router-dom"

type PropsType = {
    resultCode: number
}

const Registration = (props: PropsType) => {

    const dispatch = useDispatch<any>()

    const navigate = useNavigate()

    useEffect(() => {
        if (props.resultCode === 100) {
            navigate('/verify')
        }
    }, [props.resultCode])

    const [repeatWarning, setRepeatWarning] = useState(false)

    const onFinish = (e: FieldType) => {
        if (e.password !== e.repeatPassword) {
            setRepeatWarning(true)
        } else {
            setRepeatWarning(false)
            dispatch(registerThunk(e.login, e.password, e.email))
        }
    }

    const onFinishFailed = () => {

    }

    const [warning, setWarning] = useState("")
    let warningElem
    useEffect(() => {
        if (props.resultCode === 1) {
            setWarning("Аккаунт с таким именем уже заригистрирован")
        } else if (props.resultCode === 2) {
            setWarning("Пользователь с такой почтой уже зарегистрирован")
        } else if (props.resultCode === 3) {
            setWarning("Произошла ошибка, попробуйте позже")
        }
    }, [props.resultCode])
    if (warning) {
        warningElem = <Alert message={warning} className={s.fit_warning} type="warning" />
    }


    return (
        <div className={s.container}>
            <div className={s.form_container}>
        <h2>Registration</h2>
        <Form
            className={s.form}
            size="large"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            {warningElem}
            <Form.Item<FieldType>
                className={s.field}
                name="login"
                rules={[{ required: true, message: 'Please input your username!' }, {pattern: /^[a-zA-Z0-9]{5,15}$/, message: "Uncorrect login"}]}
            >
                <Input className={s.input} placeholder="login" />
            </Form.Item>
            <Form.Item<FieldType>
                className={s.field}
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }, {type: "email", message: "Некоректный email!"}]}
            >
                <Input className={s.input} placeholder="email" />
            </Form.Item>
            <Form.Item<FieldType>
                className={s.field}
                name="password"
                rules={[{ required: true, message: 'Please input your password!' },
                 {pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,100}$/, message: "So week password"}]}
                // { pattern: /[0-9]/, message: "Password mast contain number" },
                // { pattern: /[@!#$.?&*()^]/ , message: "Password mast contain special symbols"},
                // { min: 8, message: "Password so short"},
                // { max: 50, message: "Password so long"},
                // { pattern: /^(?=.*[a-z])(?=.*[A-Z]).{1,100}/, message: "Password must contain lowercase and uppercase"}]}
            >
                <Input.Password className={s.input} placeholder="password" />
            </Form.Item>
            <Form.Item<FieldType>
                className={s.field}
                name="repeatPassword" 
                rules={[{ required: true, message: 'Please repeat your password!' }, {message: "Password mismatch", warningOnly: repeatWarning}]}
            >
                <Input.Password className={s.input} placeholder="repeat password" />
            </Form.Item>

            <Form.Item className={s.submit}>
                <Button type="primary" htmlType="submit" size="large">
                    Submit
                </Button>
            </Form.Item>
        </Form>
            </div>
        </div>
    )
}

type FieldType = {
    login: string,
    email: string,
    password: string,
    repeatPassword: string
}

export default Registration