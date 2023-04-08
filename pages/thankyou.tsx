import type { NextPage } from "next";
import Layout from "@/components/Layout";
import PaymentInfo from "@/components/PaymentInfo";
import { useBasket } from "@/ProductsContext";

const thankyou: NextPage = () => {
  const { total } = useBasket();

  return (
    <Layout>
      <h1 className="text-emerald-800 text-center">
        Thank you for your order!
      </h1>
      <PaymentInfo info={total} />
    </Layout>
  );
};

export default thankyou;
