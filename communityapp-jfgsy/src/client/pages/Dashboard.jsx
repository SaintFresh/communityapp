import React from 'react';
import { Link } from 'react-router-dom';


export function DashboardPage() {
  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Welcome to the Community App Dashboard!</h1>
      <p className='mb-4'>Here you can access information and resources related to the YDSM:</p>
      <ul className='list-disc list-inside mb-4'>
        <li>Community Event Calendar and Notifications</li>
        <li>Community Message Board</li>
        <li>Information and Resources on Health, Wellness, and Mental Healthcare</li>
        <li>Community engagement and collaboration</li>
      </ul>
      <Link to='/events' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>View Events</Link>
    </div>
  );
}