import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={<h1 className="fw-semibold text-center mt-5">Hello world!</h1>}
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

export default App
