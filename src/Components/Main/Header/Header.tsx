import { Link } from "react-router-dom"
import s from "../Header/Header.module.css"
import { Button } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { selectUserState } from "../../../store/selectors"
import { LogoutOutlined } from "@ant-design/icons"
import { logoutThunk } from "../../../store/authReducer"


const Header = () => {

    const state = useSelector(selectUserState)

    const dispatch = useDispatch<any>()
    const logoutOnClick = () => {
        dispatch(logoutThunk())
    }

    return (
        <div className={s.container}>
            <div className={s.logo}>
                Job Parser
            </div>
            {state.resultCode === 1000 ? 
            <div className={s.buttons_flex}>
                <div className={s.login}>{state.login}</div>
                <Button onClick={logoutOnClick} className={s.logout} type="default" shape="circle"><LogoutOutlined size={100} /></Button>
            </div>
            :
            <div className={s.buttons_flex}>
                <Button type='primary' size="middle">
                <Link to="/login">Login</Link>
                </Button>
                <Button type='default' size="middle">
                <Link to="/register">Register</Link>
                </Button>
            </div> 
            }
        </div>
    )
}

export default Header