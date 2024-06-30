import { Pagination } from "antd"
import { SetStateAction, useState } from "react"
import { useDispatch } from "react-redux"
import { SearchFilterType, getVacanciesThunk } from "../../../../store/vacanciesReduser"

type PropsType = {
    currentPage: {value: number, setValue: SetStateAction<number>},
    pageSize: {value: number, setValue: SetStateAction<number>}
}

const Paginator = (props: PropsType) => {

    const onPageSizeChange = (current: number, size: number) => {
        // props.pageSize.setValue(size)
    }

    return (
        <div>
            {/* <Pagination showQuickJumper defaultCurrent={2} onShowSizeChange={onPageSizeChange} pageSize={pageSize} total={500} /> */}
        </div>
    )
}


export default Paginator