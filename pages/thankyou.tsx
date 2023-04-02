import Layout from "@/components/Layout";
import PaymentInfo from "@/components/PaymentInfo";
import { useBasket } from "@/ProductsContext";

const thankyou = () => {
  const { basketItems } = useBasket();
  console.log(basketItems);
  return (
    <Layout>
      <PaymentInfo info={333} />
    </Layout>
  );
};

export default thankyou;
