'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import { GiNotebook } from 'react-icons/gi';

const TodoListEmpty: React.FC = () => {
  const t = useTranslations('HomePage');
  return (
    <div className="flex flex-col items-center justify-center h-64 md:h-96 gap-4 text-center p-4">
      <GiNotebook className="w-12 h-12 text-gray-400" aria-hidden="true" />
      <h2 className="text-xl font-semibold text-gray-700">
        {t('noTasksFound')}
      </h2>
      <p className="text-gray-500">{t('addSomeTasksPrompt')}</p>
    </div>
  );
};

export default TodoListEmpty;
