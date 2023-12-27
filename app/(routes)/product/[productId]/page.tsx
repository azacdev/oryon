import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import { GalleryTab } from "@/components/gallery/gallery-tab";
import Info from "@/components/info";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.productId);
  const suggestedProduct = await getProducts({
    categoryId: product?.category?.id,
  });

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:gap-16">
            <GalleryTab
              className="w-full md:w-1/2"
              images={product.images ?? []}
              options={{
                loop: true,
              }}
            />
            <Separator className="mt-4 md:hidden" />
            <Info product={product} />
          </div>
        </div>
        <ProductList title="Related Items" items={suggestedProduct} />
      </Container>
    </div>
  );
};

export default ProductPage;
