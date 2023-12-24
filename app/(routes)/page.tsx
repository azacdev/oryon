import Billboard from "@/components/Billboard";
import getProducts from "@/actions/GetProducts";
import getBillboard from "@/actions/GetBillboard";
import Container from "@/components/ui/Container";
import ProductList from "@/components/ProductList";

export const revalidate = 0;

const HomePage = async () => {
  const billboard = await getBillboard("bc50d8db-090c-406d-95fb-0c859012e006");
  const products = await getProducts({ isFeatured: true });

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>

      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList title="Featured Products" items={products} />
      </div>
    </Container>
  );
};

export default HomePage;
