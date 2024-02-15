import { useEffect, useState } from 'react'
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap'
import { Articles } from '../interfaces/interfaces'
import ArticleListItem from './ArticleListItem'

const Articles = () => {
  const endPoint = 'https://api.spaceflightnewsapi.net/v4/articles/'
  const [articles, setArticles] = useState<Articles | null>(null)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const getArticles = async (url: string) => {
    try {
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setArticles(data)
      } else {
        throw new Error(String(res.status))
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const nextPage = async () => {
    setIsLoading(true)
    try {
      await getArticles(articles!.next!)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
      setPage((current) => current + 1)
    }
  }

  const previousPage = async () => {
    setIsLoading(true)
    try {
      await getArticles(articles!.previous!)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
      setPage((current) => current - 1)
    }
  }

  useEffect(() => {
    getArticles(endPoint)
  }, [])

  return (
    <>
      <Container>
        <Row>
          <Col className="d-flex justify-content-between align-items-center pb-3 mb-2 border-bottom border-secondary">
            <h3 className="m-0">Latest news:</h3>
            {articles && (
              <ButtonGroup aria-label="Change page">
                <Button
                  variant="dark"
                  disabled={articles.previous ? false : true}
                  onClick={() => previousPage()}
                >
                  {'<'}
                </Button>
                <Button variant="dark" disabled>
                  {page}
                </Button>
                <Button
                  variant="dark"
                  disabled={articles.next ? false : true}
                  onClick={() => nextPage()}
                >
                  {'>'}
                </Button>
              </ButtonGroup>
            )}
          </Col>
        </Row>
        {isLoading ? (
          <div className="text-center my-5 py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          articles &&
          articles.results.map((article) => {
            return <ArticleListItem key={article.id} article={article} />
          })
        )}
        {articles && (
          <Row>
            <Col className="d-flex justify-content-end pt-2">
              <ButtonGroup aria-label="Change page">
                <Button
                  variant="dark"
                  disabled={articles.previous ? false : true}
                  onClick={() => previousPage()}
                >
                  {'<'}
                </Button>
                <Button variant="dark" disabled>
                  {page}
                </Button>
                <Button
                  variant="dark"
                  disabled={articles.next ? false : true}
                  onClick={() => nextPage()}
                >
                  {'>'}
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        )}
      </Container>
    </>
  )
}

export default Articles
