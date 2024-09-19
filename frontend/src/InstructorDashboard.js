import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchInstructorData = async () => {
      const token = localStorage.getItem('token');
      try {
        const courseResponse = await axios.get('http://localhost:5000/instructor/courses', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(courseResponse.data);

        const studentResponse = await axios.get('http://localhost:5000/instructor/students', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(studentResponse.data);
      } catch (error) {
        console.error('Error fetching instructor data:', error);
      }
    };

    fetchInstructorData();
  }, []);

  const handleGradeChange = (studentId, newGrade) => {
    const token = localStorage.getItem('token');
    setStudents(students.map(student => student.id === studentId ? { ...student, grade: newGrade } : student));
    axios.put(`http://localhost:5000/instructor/students/${studentId}/grade`, { grade: newGrade }, {
      headers: { Authorization: `Bearer ${token}` }
    }).catch(error => {
      console.error('Error updating grade:', error);
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Instructor Dashboard</h1>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {['Courses', 'Students'].map((category) => (
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
            <h2 className="text-xl font-bold mb-4">Courses</h2>
            <ul>
              {courses.map((course) => (
                <li key={course.id} className="mb-2">
                  {course.name} - Department: {course.department}
                </li>
              ))}
            </ul>
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3">
            <h2 className="text-xl font-bold mb-4">Students</h2>
            <ul>
              {students.map((student) => (
                <li key={student.id} className="mb-2">
                  {student.name} - Grade: {student.grade}
                  <input
                    type="number"
                    value={student.grade}
                    onChange={(e) => handleGradeChange(student.id, e.target.value)}
                    className="ml-2 p-1 border rounded"
                  />
                </li>
              ))}
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default InstructorDashboard;