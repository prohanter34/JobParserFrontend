import { Pagination } from "antd"
import { Dispatch, SetStateAction } from "react"

type PropsType = {
    currentPage: {value: number, setValue: Dispatch<SetStateAction<number>>},
    pageSize: {value: number, setValue: Dispatch<SetStateAction<number>>},
    disabled: boolean
}

const Paginator = (props: PropsType) => {
    
    const onPageChange = (current: number, size: number) => {
        props.pageSize.setValue(size)
        props.currentPage.setValue(current) 
        window.scrollTo(0, 0)
    }

    return (
        <div>
            <Pagination showQuickJumper defaultCurrent={2} 
                        onChange={onPageChange} current={props.currentPage.value} 
                        pageSize={props.pageSize.value} total={500} disabled={props.disabled} />
        </div>
    )
}


export default Paginator