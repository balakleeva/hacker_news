import { useEffect, useState } from 'react'
import Story from './Story'
import Pagination from './Pagination'
import { ITEMS_PER_PAGE } from '../constants'
import StoriesService from '../services/StoriesService'

const Home = () => {
  const [allStories, setAll] = useState([])
  const [visibleStories, setVisible] = useState([])

  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    StoriesService.getStories()
      .then((result) => {
        setAll(result)
        return Promise.all(
          result
            .slice(0, ITEMS_PER_PAGE)
            .map((item) => StoriesService.getItems(item))
        )
      })
      .then((stories) => {
        setVisible(stories)
        setLoading(false)
      })
  }, [])

  const handlePagination = (page) => {
    const top = page * ITEMS_PER_PAGE
    const bottom = top - ITEMS_PER_PAGE

    setLoading(true)
    Promise.all(
      allStories.slice(bottom, top).map((item) => StoriesService.getItems(item))
    ).then((stories) => {
      setVisible(stories)
      setLoading(false)
    })
  }

  return (
    <div className="Home-container">
      <div className="wrapper">
        {isLoading && <h1>Loading...</h1>}
        {!isLoading &&
          visibleStories &&
          visibleStories.length > 0 &&
          visibleStories.map((story) => <Story key={story.id} story={story} />)}
      </div>
      <Pagination handlePagination={handlePagination} allStories={allStories} />
    </div>
  )
}

export default Home
