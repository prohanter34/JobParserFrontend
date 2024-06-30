import { Route, Routes } from "react-router-dom"
import Vacancies from "./Vacancies/Vacancies"
import Vacancy from "./Vacancy/Vacancy"



export const Content = () => {
    return (
        <div>

            <Routes>
                <Route path="/" element={<Vacancies />} />
                <Route path="/vacancies/:id" element={<Vacancy />} />
            </Routes>

        </div>
    )
}


export default Content