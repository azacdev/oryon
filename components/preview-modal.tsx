"use client";

import usePreviewModal from "@/hooks/use-preview-modals";
import Modal from "@/components/ui/modal";
import { GalleryTab } from "@/components/gallery/gallery-tab";
import Info from "@/components/info";

const PreviewModal = () => {
  const preview = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  if (!product) {
    return null;
  }
  return (
    <Modal open={preview.isOpen} onClose={preview.onClose}>
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <GalleryTab images={product.images} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <Info product={product} />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
