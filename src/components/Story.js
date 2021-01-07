import { useState, Fragment } from 'react'
import StoriesService from '../services/StoriesService'

const Story = ({ story }) => {
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const [isLoading, setLoading] = useState(false)

  const handleShowComments = (kids) => {
    setShowComments(!showComments)
    showComments ? setLoading(false) : setLoading(true)
    Promise.all(kids.map((item) => StoriesService.getItems(item))).then(
      (result) => {
        setComments(result)
        setLoading(false)
      }
    )
  }

  return (
    <div className="Story">
      <div>
        <a href={story.url} target="_blank">
          {story.title}
        </a>
      </div>
      <div>
        <span>{story.by}</span> |<span>{story.score}</span> |
        <span>{story.descendants}</span>
      </div>
      <div>
        <button onClick={() => handleShowComments(story.kids)}>
          {showComments ? 'Hide comments' : 'Show comment'}
        </button>

        {isLoading && <span>Loading...</span>}
      </div>

      {showComments && (
        <div>
          {comments.map((comment) => (
            <Fragment key={comment.id}>
              {comment.text && <div className="Comment">{comment.text}</div>}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

export default Story
