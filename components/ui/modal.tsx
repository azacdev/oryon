"use client";

import {
  Dialog,
  DialogContent,
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
      <DialogContent className="w-full max-w-3xl max-h-[98%]]">
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
