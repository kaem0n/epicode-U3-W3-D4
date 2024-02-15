import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Articles from './components/Articles'
import MyFooter from './components/MyFooter'
import ArticleDetail from './components/ArticleDetail'
import Header from './components/Header'
import { useState } from 'react'

const App = () => {
  const html = document.getElementsByTagName('html')[0]
  const [theme, setTheme] = useState(html.getAttribute('data-bs-theme')!)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header setTheme={setTheme} />
              <Home />
              <Articles theme={theme} />
              <MyFooter />
            </>
          }
        />
        <Route
          path="/article/:articleId"
          element={
            <>
              <Header setTheme={setTheme} />
              <ArticleDetail theme={theme} />
              <MyFooter />
            </>
          }
        />
        <Route
          path="*"
          element={
            <h1 className="text-center mt-5 text-danger fw-bold">
              404 - Page not found.
            </h1>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
