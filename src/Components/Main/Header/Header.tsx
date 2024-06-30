import s from "../Header/Header.module.css"


const Header = () => {
    return (
        <div className={s.container}>
            <div className={s.logo}>
                Job Parser
            </div>
        </div>
    )
}

export default Header