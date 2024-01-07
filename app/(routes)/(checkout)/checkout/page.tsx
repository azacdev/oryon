import CheckoutCart from "./components/checkout-cart";
import CheckoutForm from "./components/checkout-form";

export const revalidate = 0;

const CheckoutPage = async () => {
  return (
    <section className="relative flex h-full min-h-[100dvh] flex-col items-start justify-center lg:h-[100dvh] lg:flex-row lg:overflow-hidden">
      <CheckoutCart />
      <CheckoutForm />
    </section>
  );
};

export default CheckoutPage;
