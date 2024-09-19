import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const AdminDashboard = () => {
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Function to fetch data from backend
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const deptResponse = await axios.get('http://localhost:5000/departments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDepartments(deptResponse.data);

        const courseResponse = await axios.get('http://localhost:5000/courses', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(courseResponse.data);

        const userResponse = await axios.get('http://localhost:5000/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(userResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {['Departments', 'Courses', 'Users'].map((category) => (
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
            <h2 className="text-xl font-bold mb-4">Departments</h2>
            <ul>
              {departments.map((dept) => (
                <li key={dept.id} className="mb-2">
                  {dept.name} - Head: {dept.head}
                </li>
              ))}
            </ul>
          </Tab.Panel>
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
            <h2 className="text-xl font-bold mb-4">Users</h2>
            <ul>
              {users.map((user) => (
                <li key={user.id} className="mb-2">
                  {user.name} - Role: {user.role}
                </li>
              ))}
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default AdminDashboard;