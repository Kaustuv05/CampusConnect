import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [examSchedules, setExamSchedules] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      const token = localStorage.getItem('token');
      try {
        const enrolledResponse = await axios.get('http://localhost:5000/student/enrolled-courses', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEnrolledCourses(enrolledResponse.data);

        const availableResponse = await axios.get('http://localhost:5000/student/available-courses', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAvailableCourses(availableResponse.data);

        const examResponse = await axios.get('http://localhost:5000/student/exam-schedules', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setExamSchedules(examResponse.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {['Enrolled Courses', 'Available Courses', 'Exam Schedules'].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className="rounded-xl bg-white p-3">
            <h2 className="text-xl font-bold mb-4">Enrolled Courses</h2>
            <ul>
              {enrolledCourses.map((course) => (
                <li key={course.id} className="mb-2">
                  {course.name} - Instructor: {course.instructor}
                </li>
              ))}
            </ul>
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3">
            <h2 className="text-xl font-bold mb-4">Available Courses</h2>
            <ul>
              {availableCourses.map((course) => (
                <li key={course.id} className="mb-2">
                  {course.name} - Department: {course.department}
                </li>
              ))}
            </ul>
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3">
            <h2 className="text-xl font-bold mb-4">Exam Schedules</h2>
            <ul>
              {examSchedules.map((exam) => (
                <li key={exam.id} className="mb-2">
                  {exam.course} - Date: {exam.date}
                </li>
              ))}
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default StudentDashboard;