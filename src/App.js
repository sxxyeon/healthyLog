import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import React, { useReducer, useRef, useEffect, useState } from 'react'
//import '../src/asset/scss/style.scss'
import Mains from './pages/Mains'
import Calculators from './pages/Calculators'
import Maps from './pages/Maps'
import Results from './pages/Results'
import Logins from './pages/Logins'
import Join1s from './pages/Join1s'
import Join2s from './pages/Join2s'
import Join3s from './pages/Join3s'
import NotFound from './pages/NotFound'
import BoardWrites from './pages/BoardWrites'
import Boards from './pages/Boards'
import BoardDetails from './pages/BoardDetails'
import BoardUpdates from './pages/BoardUpdates'
import Diarys from './pages/Diarys'
import News from './pages/News'
import DiaryEdits from './pages/DiaryEdits'
import SearchIds from './pages/SearchIds'
import SearchPws from './pages/SearchPws'
import InfoLists from './pages/InfoLists'
import InfoDetails from './pages/InfoDetails'

import TopButton from './components/common/TopButton'
import Header from './components/common/Header'
import Footer from './components/common/Footer'

import DiaryProvider from './context/DiaryContext'

const Layout = () => {
  return (
    <>
      <Header />
      <div className="contWrap">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

function App() {
  return (
    <div className="App">
      <DiaryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mains />} />
            <Route path="/" element={<Layout />}>
              <Route path="/diary/main" element={<Diarys />} />
              <Route path="/diary/new" element={<News />} />
              <Route path="/auth/Search_id" element={<SearchIds />} />
              <Route path="/auth/Search_pw" element={<SearchPws />} />
              <Route path="/diary/edit/:id" element={<DiaryEdits />} />
              <Route path="/calculators" element={<Calculators />} />
              <Route path="/map" element={<Maps />} />
              <Route path="/result" element={<Results />} />
              <Route path="/auth/login" element={<Logins />} />
              <Route path="/auth/join1" element={<Join1s />} />
              <Route path="/auth/join2" element={<Join2s />} />
              <Route path="/auth/join3" element={<Join3s />} />
              <Route path="/board" element={<Boards />} />
              <Route path="/board/:id" element={<BoardDetails />} />
              <Route path="/write" element={<BoardWrites />} />
              <Route path="/update/:id" element={<BoardUpdates />} />
              <Route path="/board/Info/" element={<InfoLists />} />
              <Route path="/board/Info/:id" element={<InfoDetails />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <TopButton />
        </BrowserRouter>
      </DiaryProvider>
    </div>
  )
}

export default App
