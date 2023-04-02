import Layout from "@/components/Layout";
import PaymentInfo from "@/components/PaymentInfo";
import { useBasket } from "@/ProductsContext";

const thankyou = () => {
  const { basketItems, total } = useBasket();
  console.log(basketItems);
  return (
    <Layout>
      <PaymentInfo info={total} />
    </Layout>
  );
};

export default thankyou;
