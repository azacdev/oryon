import Billboard from "@/components/billboard";
import getProducts from "@/actions/get-products";
import getBillboard from "@/actions/get-billboard";
import Container from "@/components/ui/container";
import ProductList from "@/components/product-list";

export const revalidate = 0;

const HomePage = async () => {
  const billboard = await getBillboard("91d7d62d-9662-42ab-b6d2-9b2c15331d30");
  const products = await getProducts({ isFeatured: true });
  
  return (
    <Container>
      <div className="space-y-10 pb-10 mt-16">
        <Billboard data={billboard} />

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList
            title="Featured Products"
            description="Explore products from around the world"
            items={products}
          />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
