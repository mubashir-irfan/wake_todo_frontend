
'use client';
import { TaskModal } from "@/components";
import useStore from "@/store/useStore";
import { useTranslations } from 'next-intl';
import { useEffect, useState } from "react";
import { FaCheckDouble } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Button, CountBadge, Icon } from ".";

const Header = () => {
  const t = useTranslations('HomePage');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const { uncompleted, deleted, completed, selectedTask, setSelectedTask } = useStore();

  const onAddTask = () => {
    setIsTaskModalOpen(true);
  }

  const onCloseTaskModal = () => {
    setIsTaskModalOpen(false);
    setSelectedTask(null)
  }

  useEffect(() => {
    if (selectedTask) setIsTaskModalOpen(true);
  }, [selectedTask])

  return (
    <header className="bg-background-light-secondary dark:bg-background-dark-secondary lg:border-b lg:border-border-light border-solid dark:border-0">
      <div className='flex justify-between items-center p-4'>
        <div className='flex gap-4 items-center'>
          <Icon icon={<FaCheckDouble size={24} />} />
          <p className='text-text-dark dark:text-text-light text-2xl font-bold'>{t('title')}</p>
        </div>
        <div className='flex gap-lg'>
          <div className='flex gap-2 p-2 border-r border-solid border-border-light '>
            <CountBadge count={uncompleted} textColor='text-white' bgColor='bg-purple-500' title={t('incomplete')} />
            <CountBadge count={completed} textColor='text-black' bgColor='bg-green-500' title={t('completed')} />
            <CountBadge count={deleted} textColor='text-white' bgColor='bg-red-500' title={t('deleted')} />
          </div>
          <Button icon={<FaPlus size={16} />} onClick={onAddTask}>{t('addTask')}</Button>
        </div>
      </div>

      <TaskModal isOpen={isTaskModalOpen} onClose={onCloseTaskModal} task={selectedTask} />
    </header>
  );
};

export default Header;
