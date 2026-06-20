export interface ConfirmDeleteDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  itemName?: string;
  cancelText?: string;
  confirmText?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
