import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import ErrorPage from './pages/ErrorPage';
import Redbaba from './pages/Redbaba';
import RedChild1 from './pages/Redbaba/RedChild1';
import RedChild2 from './pages/Redbaba/RedChild2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/redbaba" element={<Redbaba />}>
            <Route path="/redbaba/redchild1" element={<RedChild1 />} />
            <Route path="/redbaba/redchild2" element={<RedChild2 />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
