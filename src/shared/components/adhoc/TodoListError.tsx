'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import { VscDebugDisconnect } from 'react-icons/vsc';

const TodoListError: React.FC = () => {
  const t = useTranslations('misc');
  return (
    <div className="flex flex-col items-center justify-center h-64 md:h-96 gap-4 text-center p-4">
      <VscDebugDisconnect // Use the broken chain icon
        className="w-12 h-12 text-yellow-500" // Change color to yellow to indicate disconnection
        aria-hidden="true"
      />
      <h2 className="text-xl font-semibold">{t('serviceRestoring')}</h2>
      <p className="text-gray-500 dark:text-gray-400">
        {t('serviceRestoringDescription')}
      </p>
      <p>
        [For Developers Only]: Please run the backend inside mock-backend folder
        :)
      </p>
    </div>
  );
};

export default TodoListError;
