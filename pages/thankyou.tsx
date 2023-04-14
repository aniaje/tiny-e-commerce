import type { NextPage } from "next";
import Layout from "@/components/Layout";
import PaymentInfo from "@/components/PaymentInfo";
import { useRouter } from "next/router";

interface State {
  orderNumber: number;
}

const thankyou: NextPage = () => {
  const router = useRouter();
  const { total, orderNumber } = router.query;
  const shortOrderNum = orderNumber?.slice(0, 10);
  return (
    <Layout>
      <h1 className="text-emerald-800 text-center">
        Thank you for your order #{shortOrderNum}
      </h1>
      <PaymentInfo info={total} />
    </Layout>
  );
};

export default thankyou;
