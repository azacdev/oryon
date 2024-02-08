import Footer from "@/components/footer";
import Navbar from "@/components/header/navbar";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
