import Search, { SearchProps } from "antd/es/input/Search"
import s from "./Vacancies.module.css"
import { Button, Checkbox, Pagination, Radio, RadioChangeEvent, Slider, Space, Switch } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeEventHandler, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { selectVacancies } from "../../../../store/selectors"
import { getVacanciesThunk } from "../../../../store/vacanciesReduser"
import Paginator from "./Paginator"
import { SwitchChangeEventHandler } from "antd/es/switch"


const Vacancies = () => {

    const [search, setSearch] = useState('')
    const dispatch = useDispatch<any>()
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        debugger
        dispatch(getVacanciesThunk({
            text: value,
            page: currentPage,
            per_page: pageSize,
            schedule,
            experience,
            salary: salary ? 1000 * salary : salary, only_with_salary
        }))
    }
    const state = useSelector(selectVacancies)



    const searchOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearch(e.currentTarget.value)
    }

    const [schedule, setScheduleValue] = useState("")
    const scheduleOnChange = (e: RadioChangeEvent) => {
        setScheduleValue(e.target.value)

    }

    const [experience, setExperienceValue] = useState("")
    const experienceOnChange = (e: RadioChangeEvent) => {
        setExperienceValue(e.target.value)
    }

    const [salary, setSalaryValue] = useState<number | undefined>(undefined)
    const salaryOnChange = (e: number) => {
        setSalaryValue(Number(e))
    }
    const [isFilterSelary, switchFilterSelary] = useState(true)
    const [lastSalary, setLastSalary] = useState<number | undefined>(0)
    const onSwitchSalary: SwitchChangeEventHandler = (e) => {
        if (!isFilterSelary) {
            setLastSalary(salary)
            setSalaryValue(0)
        } else {
            setSalaryValue(lastSalary)
        }
        switchFilterSelary(!isFilterSelary)
    }
    const [only_with_salary, setOnlyWithSalary] = useState(false)


    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    useEffect(() => {
        dispatch(getVacanciesThunk({
            text: search,
            page: currentPage,
            per_page: pageSize,
            schedule,
            experience,
            salary: salary ? 1000 * salary : salary, only_with_salary
        }))
    }, [salary, experience, only_with_salary, schedule, isFilterSelary, currentPage, pageSize])

    const vacanciesElems = state.items.map((e) => {
        return (
            <div className={s.job_item}>
                <div className={s.jod_name}>{e.name}</div>
                {e.salary !== null ? <div className={s.salary}>
                    {e.salary.from !== null ? `от ${e.salary.from} р. ` : ""}
                    {e.salary.to !== null ? `до ${e.salary.to} р.` : ""}
                </div> : ''}
                <div className={s.job_mark_container}>
                    {e.schedule?.id === "remote" ? <div className={s.job_mark}>удалённо</div> : ""}
                    {e.experience?.id === "between1And3" ? <div className={s.job_mark}>1-3 г. опыта</div> : ''}
                </div>
                <div className={s.employer}>
                    {e.employer.name}
                </div>
                <div className={s.city}>
                    {e.area.name}
                </div>
                <div className={s.info_button}>
                    <Button type="primary" size="large"><Link to={`/vacancies/${e.id}`}>Подробнее</Link></Button>
                </div>
            </div>
        )
    })



    return (
        <div className={s.container}>
            <div className={s.filter_container}>
                <h2>Фильтры</h2>
                <h3>График работы</h3>
                <Radio.Group onChange={scheduleOnChange} value={schedule}>
                    <Space direction="vertical">
                        <Radio value={""}>Всё</Radio>
                        <Radio value={"fullDay"}>Полный день</Radio>
                        <Radio value={"shift"}>Сменный график</Radio>
                        <Radio value={"flexible"}>Гибкий график</Radio>
                        <Radio value={"remote"}>Удаленная работа</Radio>
                        <Radio value={"flyInFlyOut"}>Вахтовый метод</Radio>
                    </Space>
                </Radio.Group>

                <h3>Опыт работы</h3>
                <Radio.Group onChange={experienceOnChange} value={experience}>
                    <Space direction="vertical">
                        <Radio value={""}>Всё</Radio>
                        <Radio value={"noExperience"}>Нет опыта</Radio>
                        <Radio value={"between1And3"}>От 1 года до 3 лет</Radio>
                        <Radio value={"between3And6"}>От 3 до 6 лет</Radio>
                        <Radio value={"moreThan6"}>Более 6 лет</Radio>
                    </Space>
                </Radio.Group>

                <h3>Зарплата от (т. р.)</h3>
                Фильтровать по з. п. <Switch size="small" checked={!isFilterSelary} onChange={onSwitchSalary} />
                <Slider onChangeComplete={salaryOnChange} disabled={isFilterSelary} min={0} max={1000} step={10} />
                <Checkbox value={only_with_salary} onChange={() => { setOnlyWithSalary(!only_with_salary) }}>Только с указанной з. п.</Checkbox>
            </div>


            <div className={s.main_container}>

                <div className={s.search}>
                    <Search
                        placeholder="backend разработчик"
                        allowClear
                        enterButton="Поиск"
                        size="large"
                        onSearch={onSearch}
                        value={search}
                        onChange={searchOnChange}
                    />
                </div>
                {state.text !== "" ? <h2>{state.found} вакансий "{state.text}"</h2> : <h2>Рекомендации</h2>}

                <div className={s.jobs_container}>

                    {vacanciesElems}
                    {/* <Paginator filters={{
                        text: search,
                    page: 1,
                    per_page: 10,
                    schedule,
                    experience,
                    salary: salary ? 1000*salary : salary, only_with_salary
        }} /> */}

                </div>
            </div>



        </div>
    )
}

export default Vacancies