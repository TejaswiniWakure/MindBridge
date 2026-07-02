import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle, HelpCircle } from 'lucide-react';

const Dialog = ({
  isOpen,
  onClose,
  title = 'Are you sure?',
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  isLoading = false,
  variant = 'danger', // 'danger', 'primary', 'warning'
}) => {
  const iconColors = {
    danger: <AlertTriangle className="w-8 h-8 text-rose-500" />,
    warning: <AlertTriangle className="w-8 h-8 text-amber-500" />,
    primary: <HelpCircle className="w-8 h-8 text-primary-500" />,
  };

  const confirmBtnVariants = {
    danger: 'danger',
    warning: 'secondary',
    primary: 'primary',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center p-2">
        <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-full flex-shrink-0">
          {iconColors[variant]}
        </div>
        <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2">
          {title}
        </h4>
        {description && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            {description}
          </p>
        )}
        <div className="flex items-center gap-3 w-full">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={confirmBtnVariants[variant]}
            className="flex-1"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Dialog;
