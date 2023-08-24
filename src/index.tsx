import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import TemplateLayout from './components/Layout/Layout';
import StudyPlanList from './components/StudyPlanList/StudyPlanList';
import StudyPlanDetail from './components/StudyPlanDetail/StudyPlanDetail';
import UserList from './components/UserList/UserList';




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
  <Router>
      <Routes>
       
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<TemplateLayout />}>
          <Route index element={<></>} />
          <Route path='user-list' element={<UserList />} />
          <Route path="study-plan" element={<StudyPlanList />} />
          <Route path="study-plan/:id" element={<StudyPlanDetail />} />
        </Route>
      </Routes>
    </Router>
  </>
);


reportWebVitals();
