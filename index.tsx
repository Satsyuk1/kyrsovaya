import React from 'react'
import App from './App'
import './style/reset.scss'
import './style/index.scss'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/to-do" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
