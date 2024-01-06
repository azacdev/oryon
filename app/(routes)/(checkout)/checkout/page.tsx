import CheckoutCart from "./components/checkout-cart";

export const revalidate = 0;

const CheckoutPage = async () => {
  return (
    <div>
      <CheckoutCart />
    </div>
  );
};

export default CheckoutPage;
