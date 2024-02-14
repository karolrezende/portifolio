import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import About from "./pages/about/page"
import Projects from "./pages/projects/page"
import Contact from "./pages/contact/page"
import Home from "./pages/home/page"

function App() {

  return (
    <>
      <main className='bg-slate-300/20'>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/*'
              element={
                <>
                  <Routes>
                    <Route path='/about' element={<About />} />
                    <Route path='/projects' element={<Projects />} />
                    <Route path='/contact' element={<Contact />} />
                  </Routes>

                </>
              }
            />
          </Routes>
        </Router>
      </main>
    </>
  )
}

export default App
