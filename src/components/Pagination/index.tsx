import ReactPaginate from 'react-paginate'
import s from './Pagination.module.scss'
import { FC } from 'react'

type PaginationProps = {
  value: number
  onChangePage: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({ value, onChangePage }) => {
  return (
    <ReactPaginate
      className={s.root}
      breakLabel="..."
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={6}
      pageCount={4}
      previousLabel="<"
      nextLabel=">"
      forcePage={value - 1}
    />
  )
}

export default Pagination
