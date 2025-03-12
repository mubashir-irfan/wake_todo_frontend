'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import { FaSyncAlt } from 'react-icons/fa';

const TodoListError: React.FC = () => {
  const t = useTranslations('misc');
  return (
    <div className="flex flex-col items-center justify-center h-64 md:h-96 gap-4 text-center p-4">
      <FaSyncAlt className="w-12 h-12 text-blue-500 animate-spin" aria-hidden="true" />
      <h2 className="text-xl font-semibold text-blue-700">
        {t('serviceRestoring')}
      </h2>
      <p className="text-gray-500">{t('serviceRestoringDescription')}</p>
    </div>
  );
};

export default TodoListError;