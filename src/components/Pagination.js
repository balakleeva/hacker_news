import { useState } from 'react'
import cx from 'classnames'
import { ITEMS_PER_PAGE } from '../constants'

const Pagination = ({ allStories, handlePagination }) => {
  const [currentPage, setPage] = useState(1)
  const lastPage = Math.ceil(allStories.length / ITEMS_PER_PAGE)

  const handleClick = (page) => {
    setPage(page)
    handlePagination(page)
  }

  return (
    <div className="Pagination">
      <div
        className={cx('Page', { selected: currentPage === 1 })}
        onClick={() => handleClick(1)}
      >
        1
      </div>

      {currentPage >= 3 && (
        <div className="Page" onClick={() => handleClick(currentPage - 1)}>
          {currentPage - 1}
        </div>
      )}

      {currentPage !== 1 && currentPage !== lastPage && (
        <div className="Page selected">{currentPage}</div>
      )}

      {currentPage + 1 < lastPage && (
        <div className="Page" onClick={() => handleClick(currentPage + 1)}>
          {currentPage + 1}
        </div>
      )}

      {allStories.length > 0 && (
        <div
          className={cx('Page', { selected: currentPage === lastPage })}
          onClick={() => handleClick(lastPage)}
        >
          {lastPage}
        </div>
      )}
    </div>
  )
}

export default Pagination
