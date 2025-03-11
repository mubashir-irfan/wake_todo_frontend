'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { NewTaskPayload, Task } from '@/types';
import { Button, Modal } from '@/shared/components';
import { z } from 'zod';
import { TasksService } from '@/services';
import { getCurrentDateTimeStamp } from '@/utils';

const taskSchema = z.object({
  text: z.string().min(1, 'Task text is required').max(100, 'Max characters 100')
});

interface TaskModalProps {
  task?: Task;
  isOpen: boolean;
  onClose: () => void;
}

function TaskModal({ task, isOpen, onClose }: TaskModalProps) {
  const [text, setText] = useState('');
  const [errorMsg, setErrorMsg] = useState<string>('')
  const isEditMode = !!task;

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
    }
    console.log('new task payload', newTask)
    TasksService.addTask(newTask).then(() => {
      alert('Task added successfully')
    }).catch((err) => {
      console.error('Failed to add task', err)
    })
  }

  const onUpdateTask = () => {
    if (!task) {
      console.error('[Exception] Undefined task in onUpdateTask');
      return;
    }
    TasksService.updateTask(task.id, {
      ...task,
      text
    }).then(() => {
      alert('Task updated successfully')
    }).catch((err) => {
      console.error('Failed to update task', err)
    })
  }

  const onSubmit = () => {
    try {
      const validatedTask = taskSchema.parse({ text });
      console.log('ZodValidated task:', validatedTask);
      if (task) onUpdateTask();
      else onAddTask();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // if we had multiple fields, we would have used a form structure for error messages
        const errors = error.errors;
        if (errors.length) {
          setErrorMsg(errors[0].message)
        }

      }
    }
  }


  const resetState = () => {
    setText('');
    setErrorMsg('')
  }
  const onModalClose = () => {
    resetState();
    onClose();
  }

  return (
    <Modal
      title={isEditMode ? 'Edit Task' : 'Add Task'}
      isOpen={isOpen}
      onClose={onModalClose}
      primaryButton={
        <Button variant='primary' onClick={onSubmit}>
          {isEditMode ? 'Update Task' : 'Add Task'}
        </Button>
      }
      secondaryButton={
        <Button type="button" variant="secondary" onClick={onModalClose} className="ms-2">
          Cancel
        </Button>
      }
    >
      <div className="flex flex-col gap-2">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full max-w-full overflow-hidden whitespace-pre-wrap break-words resize-vertical"
          maxLength={250}
          placeholder='Enter task name here...'
        />
        {!!errorMsg && <p className='w-full text-red-700 text-sm'>{errorMsg}</p>}
      </div>
    </Modal>
  );
}

export default TaskModal;