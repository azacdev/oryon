import CheckoutCart from "./components/checkout-cart";
import CheckoutForm from "./components/checkout-form";

export const revalidate = 0;

const CheckoutPage = async () => {
  return (
    <section className="relative grid h-full min-h-[100dvh] grid-cols-1 items-start justify-center lg:h-[100dvh] lg:grid-cols-2 lg:overflow-hidden">
      <CheckoutCart />
      <CheckoutForm />
    </section>
  );
};

export default CheckoutPage;
