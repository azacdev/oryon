"use client";

import usePreviewModal from "@/hooks/use-preview-modals";
import Modal from "@/components/ui/modal";
import { GalleryTab } from "@/components/gallery/gallery-tab";
import Currency from "./ui/currency";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

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
          <div className="">
            <h2 className=" text-2xl font-bold">{product.name}</h2>
            <p className="text-base">
              <Currency value={product?.price} />
            </p>
          </div>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="description"
          >
            <AccordionItem value="description" className="border-none">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {product.description ??
                  "No description is available for this product."}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
