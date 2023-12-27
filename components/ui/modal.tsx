"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="w-full max-w-3xl">
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
