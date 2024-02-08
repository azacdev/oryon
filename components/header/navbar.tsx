import Link from "next/link";

import Container from "@/components/ui/container";
import DesktopNav from "@/components/header/desktop-nav";
import CartSheet from "@/components/cart/cart-sheet";
import getCategories from "@/actions/get-categories";
import { ProductsCommandMenu } from "../products-command-menu";
import { MobileNav } from "./mobile-nav";

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <nav className="border-b fixed top-0 w-full z-10 bg-white">
      <Container>
        <div className="relative flex px-4 sm:px-6 lg:px-8 h-16 items-center">
          <MobileNav categories={categories} />
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">ORYON</p>
          </Link>
          <DesktopNav categories={categories} />

          <div className="flex items-center space-x-2 ml-auto">
            <ProductsCommandMenu />
            <CartSheet />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
