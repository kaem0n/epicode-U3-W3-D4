import { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Article } from '../interfaces/interfaces'

const ArticleDetail = () => {
  const endPoint = 'https://api.spaceflightnewsapi.net/v4/articles/'
  const params = useParams()
  const navigate = useNavigate()
  const [articleData, setArticleData] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [nextPage, setNextPage] = useState<string | undefined>(undefined)
  const [prevPage, setPrevPage] = useState<string | undefined>(undefined)

  const getArticleData = async () => {
    setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

  const getNextArticle = async () => {
    try {
      const res = await fetch(endPoint)
      if (res.ok) {
        const data = await res.json()
        for (let i = 0; i < data.results.length; i++) {
          if (Number(params.articleId) === data.results[i].id && i === 0) {
            setNextPage(data.results[i + 1].id)
            setPrevPage(undefined)
          } else if (
            Number(params.articleId) === data.results[i].id &&
            i !== 0
          ) {
            setNextPage(data.results[i + 1].id)
            setPrevPage(data.results[i - 1].id)
          } else if (
            Number(params.articleId) === data.results[i].id &&
            i === data.results.length - 1
          ) {
            setNextPage(undefined)
            setPrevPage(data.results[i - 1].id)
          }
        }
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
    getArticleData()
    getNextArticle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  return (
    <Container className="my-5">
      <Row>
        {isLoading ? (
          <div className="text-center my-5 py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          articleData && (
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
          )
        )}
        <Col className="d-flex justify-content-end">
          <Link to="/" className="btn btn-dark">
            Back to Home
          </Link>
          <Button
            onClick={() => navigate(`/article/${prevPage}`)}
            variant="secondary"
            className="mx-1"
            disabled={prevPage ? false : true}
          >
            Previous article
          </Button>
          <Button
            onClick={() => navigate(`/article/${nextPage}`)}
            variant="primary"
            disabled={nextPage ? false : true}
          >
            Next article
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ArticleDetail
