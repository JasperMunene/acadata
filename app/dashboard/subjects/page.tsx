import Link from 'next/link';
import React from 'react';
import { GraduationCap } from 'lucide-react';
import { grades } from '@/constants/constants';


const SubjectPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Select a Grade to Add Subjects
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {grades.map((grade) => (
            <Link key={grade.path} href={`/dashboard/subjects/${grade.path}`}>
              <div className="group block p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <GraduationCap className="text-blue-500 text-3xl group-hover:text-blue-700 transition-colors duration-300" />
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                    {grade.name}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <footer className="mt-12 text-center text-gray-600">
        <p>&copy; 2024 AcaData. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SubjectPage;
