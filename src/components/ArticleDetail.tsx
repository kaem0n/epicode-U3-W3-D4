import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { Article } from '../interfaces/interfaces'

const ArticleDetail = () => {
  const endPoint = 'https://api.spaceflightnewsapi.net/v4/articles/'
  const params = useParams()
  const [articleData, setArticleData] = useState<Article | null>(null)

  const getArticleData = async () => {
    try {
      const res = await fetch(endPoint + params.articleId)
      if (res.ok) {
        const data = await res.json()
        setArticleData(data)
      } else {
        throw new Error(String(res.status))
      }
    } catch (err) {
      console.log(err)
    }
  }

  const convertDate = (date: string) => {
    const simpleDate = date
      .slice(0, date.indexOf('T'))
      .replace('-', '/')
      .replace('-', '/')
    const time = date.slice(date.indexOf('T') + 1, date.indexOf('T') + 6)
    return simpleDate + ' | ' + time
  }

  useEffect(() => {
    console.log(params)
    getArticleData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container className="my-5">
      <Row>
        {articleData && (
          <Col xs={12}>
            <div className="text-center mb-4">
              <img
                src={articleData.image_url}
                alt={`${articleData.id}`}
                className="w-75"
              />
            </div>
            <h1>{articleData.title}</h1>
            <div className="d-flex justify-content-between mb-3">
              <h6>
                <span className="fw-bold">Published:</span>{' '}
                {convertDate(articleData.published_at)}{' '}
                <span className="fw-bold">by:</span>{' '}
                <a
                  href={articleData.url}
                  className="link-underline link-underline-opacity-0"
                >
                  {articleData.news_site}
                </a>
              </h6>
              <h6>
                <span className="fw-bold">Last updated:</span>{' '}
                {convertDate(articleData.updated_at)}
              </h6>
            </div>
            <p>{articleData.summary}</p>
          </Col>
        )}
        <Col className="d-flex justify-content-end">
          <Link to="/" className="btn btn-dark text-end">
            Go back
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default ArticleDetail
