'use client';

import { useState, useEffect, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { NewTaskPayload, Task } from '@/types';
import { Button, Modal } from '@/shared/components';
import { z } from 'zod';
import { TasksService } from '@/services';
import { getCurrentDateTimeStamp } from '@/shared/utils';
import useStore from '@/store/useStore';
import { useTranslations } from 'next-intl';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

function TaskModal({ task, isOpen, onClose }: TaskModalProps) {
  const t = useTranslations('HomePage');
  const [text, setText] = useState('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const isEditMode = !!task;
  const { setUpdatedAt } = useStore();

  const taskSchema = useMemo(() => {
    return z.object({
      text: z
        .string()
        .min(1, t('pleaseEnterTaskTitle'))
        .max(100, t('taskTitleMaxLength')),
    });
  }, []);

  useEffect(() => {
    if (task) {
      setText(task.text);
    } else {
      setText('');
    }
  }, [task]);

  const onAddTask = () => {
    const newTask: NewTaskPayload = {
      text,
      completed: false,
      deleted: false,
      createdAt: getCurrentDateTimeStamp(),
    };
    TasksService.addTask(newTask)
      .then(() => {
        // alert('Task added successfully');
        setUpdatedAt(getCurrentDateTimeStamp());
      })
      .catch((err) => {
        console.error('Failed to add task', err);
      })
      .finally(onModalClose);
  };

  const onUpdateTask = () => {
    if (!task) {
      console.error('[Exception] Undefined task in onUpdateTask');
      return;
    }
    TasksService.updateTask(task.id, {
      ...task,
      text,
    })
      .then(() => {
        // alert('Task updated successfully');
        setUpdatedAt(getCurrentDateTimeStamp());
      })
      .catch((err) => {
        console.error('Failed to update task', err);
      })
      .finally(onModalClose);
  };

  const onSubmit = () => {
    try {
      taskSchema.parse({ text });
      if (task) onUpdateTask();
      else onAddTask();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // if we had multiple fields, we would have used a form structure for error messages
        const errors = { ...error.errors };
        if (errors.length) {
          setErrorMsg(errors[0].message);
        }
      }
    }
  };

  const resetState = () => {
    setText('');
    setErrorMsg('');
  };
  const onModalClose = () => {
    resetState();
    onClose();
  };

  return (
    <Modal
      title={isEditMode ? t('editTask') : t('addTask')}
      isOpen={isOpen}
      onClose={onModalClose}
      primaryButton={
        <Button variant="primary" onClick={onSubmit}>
          {isEditMode ? t('updateTask') : t('addTask')}
        </Button>
      }
      secondaryButton={
        <Button type="button" variant="secondary" onClick={onModalClose}>
          {t('cancel')}
        </Button>
      }
    >
      <div className="flex flex-col gap-2">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full max-w-full overflow-hidden whitespace-pre-wrap break-words resize-vertical"
          maxLength={250}
          placeholder={t('enterTaskTitle')}
        />
        {!!errorMsg && (
          <p className="w-full text-red-700 text-sm">{errorMsg}</p>
        )}
      </div>
    </Modal>
  );
}

export default TaskModal;
