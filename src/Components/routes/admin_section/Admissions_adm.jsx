import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

function Admission_adm() {
   
    return (
        <>
            <nav className="bg-gray-800 p-4 m-6">
                <div className="container mx-auto flex justify-between">
                    <div className="flex space-x-4">
                        <Link className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" to="/admin/admission_adm/new_course">
                            Add new course
                        </Link>
                        <Link className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700" to="/admin/admission_adm/">
                            Admissions
                        </Link>
                        <Link className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-700" to="/admin/admission_adm/add_sub">
                            Add Subjects
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="mt-8 px-4">
                <Outlet />
            </div>
        </>
    );
}
export default Admission_adm;
