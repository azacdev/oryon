import { Products } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getSearchProducts = async (searchQuery?: string): Promise<Products[]> => {
  let url = `${API_URL}/products`;

  const res = await fetch(url);
  const allProducts: Products[] = await res.json();

  if (searchQuery) {
    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredProducts;
  }

  return allProducts;
};

export default getSearchProducts;
