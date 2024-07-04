import { useDispatch, useSelector } from "react-redux"
import s from "./Vacancy.module.css"
import { selectCurrentVacancy } from "../../../../store/selectors"
import { useEffect } from "react"
import { getCurrentVacancy } from "../../../../store/vacanciesReduser"
import { Link, useLocation } from "react-router-dom"
import { Button } from "antd"


const Vacancy = () => {

    const state = useSelector(selectCurrentVacancy)
    const dispatch = useDispatch<any>()

    const path = useLocation()
    useEffect(() => {
        const arr = path.pathname.split("/")
        const id = Number(arr[2])
        dispatch(getCurrentVacancy(id))
        window.scrollTo(0, 0)
    }, [])


    const skillsElems = state?.key_skills.map((e) => {
        return (
            <div className={s.skill}>{e.name}</div>
        )
    })

    return (
        <div className={s.container}>

            <div className={s.skills_and_info}>
                <div className={s.short_info}>
                    <div className={s.button_info_flex}>

                        <div>
                            <div className={s.jod_name}>{state?.name}</div>
                            {state?.salary !== null ? <div className={s.salary}>
                                {state?.salary.from !== null && state?.salary.from !== undefined ? `от ${state?.salary.from} р. ` : ""}
                                {state?.salary.to !== null && state?.salary.to !== undefined ? `до ${state?.salary.to} р.` : ""}
                            </div> : ''}
                            <div className={s.job_mark_container}>
                                {state?.schedule?.id === "remote" ? <div className={s.job_mark}>удалённо</div> : ""}
                                {state?.experience?.id === "between1And3" ? <div className={s.job_mark}>1-3 г. опыта</div> : ''}
                                <div className={s.job_mark}>{state?.employment?.name}</div>
                            </div>
                            <div className={s.info_button}>
                            </div>
                            <div className={s.employer}>
                                {state?.employer.name}
                            </div>
                            <div className={s.city}>
                                {state?.area.name}

                            </div>
                        </div>

                        <div className={s.link_button}>

                            {state?.alternate_url !== null && state !== null ?
                                <Button type="primary" size="large"><Link to={state?.alternate_url}>Перейти на сайт</Link></Button> : ""}

                        </div>
                    </div>
                </div>

                {skillsElems !== undefined && skillsElems.length > 0 ? <div className={s.skills_container}>
                    <div>Требуемые скилы:</div>
                    <div className={s.skills_flex}>
                        {skillsElems}
                    </div>
                </div> : ""}


            </div>


            <h2 className={s.description_header}>
                Описание
            </h2>
            <div className={s.info}>
                <div dangerouslySetInnerHTML={{ __html: state !== null && state.description !== null ? state.description : "" }}></div>
            </div>

        </div>
    )
}


export default Vacancy