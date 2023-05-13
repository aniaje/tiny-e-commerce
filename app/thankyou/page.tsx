"use client";
import type { NextPage } from "next";
import Layout from "@/components/Layout";
import PaymentInfo from "@/components/PaymentInfo";
import { useRouter, useSearchParams } from "next/navigation";

interface State {
  orderNumber: string;
}

const thankyou: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const total = searchParams.get("total");
  console.log(total);
  // const shortOrderNum = orderNumber?.slice(0, 10);
  return (
    <Layout>
      <h1 className="text-emerald-800 text-center">
        Thank you for your order #{orderNumber}
      </h1>
      <PaymentInfo info={total} />
    </Layout>
  );
};

export default thankyou;
