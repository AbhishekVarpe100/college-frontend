import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Announcement from './routes/admin_section/Announcement';
import Add_Videos from './routes/admin_section/Add_Videos';
import Statistics from './routes/admin_section/Statistics';
import Placements from './routes/stud_section/Placements';
import Add_Placements from './routes/admin_section/Add_Placements';
import Add_blogs from './routes/admin_section/Add_blogs';
import Student_voice from './routes/admin_section/Student_voice';
import Admission_adm from './routes/admin_section/Admissions_adm';
import Exams from './routes/admin_section/Exams';
import StudentMsgs from './routes/admin_section/StudentMsgs';
import Reply from './routes/admin_section/Reply';
import Users from './routes/admin_section/Users';

function AdminRoutes(){
  return (
    <>

    <Routes>
        {/* <Route index element={<Announcement></Announcement>}></Route> */}
        <Route path='add_videos' element={<Add_Videos></Add_Videos>}></Route>
        <Route path='statistics' element={<Statistics></Statistics>}></Route>
        <Route path='add_placements' element={<Add_Placements></Add_Placements>}></Route>
        <Route path='add_blogs' element={<Add_blogs></Add_blogs>}></Route>
        <Route path='stud_voice' element={<Student_voice></Student_voice>}></Route>
        <Route path='admission_adm' element={<Admission_adm></Admission_adm>}></Route>
        <Route path='exam_applications' element={<Exams></Exams>}></Route>
        <Route path='stud_msgs' element={<StudentMsgs></StudentMsgs>}>
        <Route path='reply/:username' element={<Reply></Reply>}></Route>
        <Route path='users' element={<Users></Users>}></Route>
        </Route>
    </Routes>
    
    </>
  )
}

export default AdminRoutes;