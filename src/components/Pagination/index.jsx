import React from 'react'
import styles from './Pagination.module.scss'
import ReactPaginate from 'react-paginate'
const Pagination = () => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => console.log(event)}
      pageRangeDisplayed={8}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
