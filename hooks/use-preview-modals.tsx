import { create } from "zustand";
import { Products } from "@/types/types";

interface PreviewModalStore {
  isOpen: boolean;
  data?: Products;
  onOpen: (data: Products) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Products) => set({ data: data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


export default usePreviewModal