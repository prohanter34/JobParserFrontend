import { Layout } from "antd"
// import MyMenu from "./Menu/Menu"
// import Content from "./Content/Content"
// import Footer from "./Footer/Footer"
import s from "./Main.module.css"
import Header from "./Header/Header"
import Content from "./Content/Content"
import Footer from "./Footer/Footer"


const Main = () => {
    return (
        <div>
            <Layout>
                <Header />
                <Layout className={s.main_layout}>
                    {/* <MyMenu /> */}
                    <Content />
                </Layout>
                <Footer />
            </Layout>
        </div>
    )
}

export default Main