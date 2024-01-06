import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
