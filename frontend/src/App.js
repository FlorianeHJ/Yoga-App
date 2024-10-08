import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Error from './pages/Error'
import Home from './pages/Home'
import Signin from './pages/Signin'

const App = () => {
    return (
        <div className="bg-background">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
