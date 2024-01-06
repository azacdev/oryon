import Link from "next/link";

import Container from "@/components/ui/container";
import MainNav from "@/components/main-nav";
import CartSheet from "@/components/cart/cart-sheet";
import getCategories from "@/actions/get-categories";

const Navbar = async () => {
  const categories = await getCategories();
  
  return (
    <div className="border-b">
      <Container>
        <div className="relative flex px-4 sm:px-6 lg:px-8 h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">ORYON</p>
          </Link>
          <MainNav categories={categories} />
          <CartSheet />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
