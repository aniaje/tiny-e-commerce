interface Props {
  info: number;
}

const PaymentInfo = ({ info }: Props) => (
  <div
    className="w-full p-12
  h-40 border-double border-4 border-emerald-500 rounded  grid place-items-center "
  >
    <p>Make a payment of $ {info} to an account</p>
    <p>LOL 85109 024028 2973364 85969</p>
    <p>
      and send us a confirmation to the email address:
      <a href="mailto:jezowskanan@gmail.com">mail</a>
    </p>
  </div>
);

export default PaymentInfo;
