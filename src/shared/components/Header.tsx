
'use client';
import { FaCheckDouble } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useTranslations } from 'next-intl';
import useStore from "@/store/useStore";
import { Button, Icon, CountBadge } from ".";

const Header = () => {
  const t = useTranslations('HomePage');
  const { uncompleted, deleted, completed } = useStore();

  return (
    <header className="bg-background-light-secondary dark:bg-background-dark-secondary lg:border-b lg:border-border-light border-solid dark:border-0">
      <div className='flex justify-between items-center p-4'>
        <div className='flex gap-4 items-center'>
          <Icon icon={<FaCheckDouble size={24} />} />
          <p className='text-text-dark dark:text-text-light text-2xl font-bold'>{t('title')}</p>
        </div>
        <div className='flex gap-lg'>
          <div className='flex gap-2 p-2 border-r border-solid border-border-light '>
            <CountBadge count={uncompleted} textColor='text-text-white' bgColor='bg-accent-purple' />
            <CountBadge count={deleted} textColor='text-text-white' bgColor='bg-accent-red' />
            <CountBadge count={completed} textColor='text-text-dark' bgColor='bg-accent-green' />
          </div>
          <Button icon={<FaPlus size={16} />}>{t('addTask')}</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
