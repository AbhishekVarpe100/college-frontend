import React from 'react'
import { lazy,Suspense } from 'react';
import Examinations from './routes/stud_section/Examinations'
import About from './routes/stud_section/About'
import Admissions from './routes/stud_section/Admissions'
import {Routes,Route,Navigate} from 'react-router-dom';
import Placements from './routes/stud_section/Placements';
// import Campus from './routes/stud_section/Campus';
import Blogs from './routes/stud_section/Blogs';
import ContactUs from './routes/stud_section/ContactUs';
import Result from './routes/stud_section/Result';
import Notices from './routes/stud_section/Notices';
import Chat from './routes/stud_section/Chat';


const Campus=lazy(()=>import('./routes/stud_section/Campus'))


function ProfileRoutes() {
  return (
    <>
    
    <Routes>
        <Route path='examinations' element={<Examinations></Examinations>}></Route>
        {/* <Route index element={<About></About>}></Route> */}
        <Route path='admissions' element={<Admissions></Admissions>}></Route>
        <Route path='placements' element={<Placements></Placements>}></Route>
        <Route path='campus' element={<Suspense fallback={<div>Loading page...</div>}> <Campus></Campus> </Suspense>}></Route>
        <Route path='blogs' element={<Blogs></Blogs>}></Route>
        <Route path='contact_us' element={<ContactUs></ContactUs>}></Route>
        <Route path='results' element={<Result></Result>}></Route>
        <Route path='notices' element={<Notices></Notices>}></Route>
        <Route path='chat' element={<Chat></Chat>}></Route>
    </Routes>

    </>
  )
}

export default ProfileRoutes;