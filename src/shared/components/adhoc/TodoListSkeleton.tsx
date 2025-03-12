'use client';

import React from 'react';

const TodoListSkeleton: React.FC = () => {
  return (
    <div className='flex flex-col gap-3'>
      <div className="space-y-2 shadow-lg">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index}>
            {index > 0 && <hr className="border-t border-gray-300" />}
            <div className="flex items-center justify-between p-3">
              <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="w-1/2 h-4 mx-3 bg-gray-200 animate-pulse"></div>
              <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <div className="w-20 h-8 bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
};

export default TodoListSkeleton;