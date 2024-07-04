import { Alert, Button, Form, Input, Radio } from "antd"
import s from "./Auth.module.css"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AppThunk, loginThunk } from "../../store/authReducer"


type PropsType = {
    resultCode: number
}

const Login = (props: PropsType) => {

    const dispatch = useDispatch<any>()

    const onFinish = (e: FieldType) => {
        dispatch(loginThunk(e.login, e.password))
    }

    const onFinishFailed = () => {

    }

    const navigate = useNavigate()
    const [warning, setWarning] = useState("");
    let warningElem
    useEffect(() => {
        if (props.resultCode === 1) {
            setWarning("Такого аккаунта не существует!")
        } else if (props.resultCode === 2) {
            setWarning("Что-то введено неверно!")
        } else if (props.resultCode === 1000) {
            navigate('/')
        }
    }, [props.resultCode])

    if (warning) {
        warningElem = <Alert className={s.fit_warning} type="error" message={warning} />
    }

    return (
        <div className={s.container}>
            <div className={s.form_container}>
            <h2>Login</h2>
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
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                    <Input className={s.input} placeholder="login" />
                </Form.Item>
                <Form.Item<FieldType>
                    className={s.field}
                    name="password"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                    <Input.Password className={s.input} placeholder="password" />
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

export default Login

type FieldType = {
    login: string,
    password: string
}

