import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Article } from '../interfaces/interfaces'

interface ArticleListItemProps {
  article: Article
}

const ArticleListItem = ({ article }: ArticleListItemProps) => {
  const convertDate = (date: string) => {
    const simpleDate = date
      .slice(0, date.indexOf('T'))
      .replace('-', '/')
      .replace('-', '/')
    const time = date.slice(date.indexOf('T') + 1, date.indexOf('T') + 6)
    return simpleDate + ' | ' + time
  }

  return (
    <Row className="border-bottom border-secondary mb-2 py-1">
      <Col xs={2}>
        <Link
          to={`/article/${article.id}`}
          className="link-underline link-underline-opacity-0"
        >
          <img src={article.image_url} alt={`${article.id}`} width="100%" />
        </Link>
      </Col>
      <Col xs={10}>
        <div>
          <Link
            to={`/article/${article.id}`}
            className="link-underline link-underline-opacity-0"
          >
            <h5>{article.title}</h5>
          </Link>
          <p>
            <span className="fw-semibold">Published:</span>{' '}
            {convertDate(article.published_at)}{' '}
            <span className="fw-semibold">by:</span>{' '}
            <a
              href={article.url}
              className="link-underline link-underline-opacity-0"
            >
              {article.news_site}
            </a>
          </p>
          <p>{article.summary}</p>
        </div>
      </Col>
    </Row>
  )
}

export default ArticleListItem
