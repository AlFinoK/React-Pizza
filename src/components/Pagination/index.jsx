import ReactPaginate from 'react-paginate'
import s from './Pagination.module.scss'

const Pagination = ({ value, onChangePage }) => {
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
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
