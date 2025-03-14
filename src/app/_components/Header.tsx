'use client';
import { TaskModal } from './';
import useStore from '@/store/useStore';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { FaCheckDouble } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { Button, CountBadge, Icon } from '../../shared/components';

const Header = () => {
  const t = useTranslations('HomePage');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const { uncompleted, deleted, completed, selectedTask, setSelectedTask } =
    useStore();

  const onAddTask = () => {
    setIsTaskModalOpen(true);
  };

  const onCloseTaskModal = () => {
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  useEffect(() => {
    if (selectedTask) setIsTaskModalOpen(true);
  }, [selectedTask]);

  return (
    <header
      className="bg-background-light-secondary dark:bg-background-dark-secondary border-b border-gray-300 dark:border-gray-700 border-solid"
      data-testid="header"
    >
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-2 items-center">
          <Icon icon={<FaCheckDouble size={24} />} />
          <p
            className="text-text-dark dark:text-text-light text-2xl font-bold"
            data-testid="header-title"
          >
            {t('title')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2" data-testid="count-badge-container">
            <CountBadge
              count={uncompleted}
              textColor="text-white"
              bgColor="bg-purple-500"
              title={t('incomplete')}
              data-testid="incomplete-badge"
            />
            <CountBadge
              count={completed}
              textColor="text-black"
              bgColor="bg-green-500"
              title={t('completed')}
              data-testid="completed-badge"
            />
            <CountBadge
              count={deleted}
              textColor="text-white"
              bgColor="bg-red-500"
              title={t('deleted')}
              data-testid="deleted-badge"
            />
          </div>
          <div className="w-[1px] h-4 bg-gray-300 dark:bg-gray-700" />
          <Button
            icon={<FaPlus size={16} />}
            onClick={onAddTask}
            data-testid="add-task-button"
          >
            {t('addTask')}
          </Button>
        </div>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={onCloseTaskModal}
        task={selectedTask}
        data-testid="task-modal"
      />
    </header>
  );
};

export default Header;
