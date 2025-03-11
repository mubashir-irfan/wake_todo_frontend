'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { ReactNode } from 'react';

interface ModalProps {
  title: string;
  description?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  primaryButton?: ReactNode;
  secondaryButton?: ReactNode;
}

function Modal({
  title,
  description,
  children,
  isOpen,
  onClose,
  primaryButton,
  secondaryButton,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
        <DialogFooter>
          {secondaryButton}
          {primaryButton}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;