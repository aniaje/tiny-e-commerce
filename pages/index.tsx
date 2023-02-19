export default function Home() {
  return (
    <>
      <h2 className="py-4 text-2xl">Food</h2>
      <div className="w-64 py-4 ">
        <div className="bg-slate-300 hover:bg-slate-200 hover:transition-all p-5 rounded-xl transition-duration: 350ms;">
          <img src="/products/img110.png" />
        </div>

        <h3 className="text-bold text-lg mt-2">kalafior</h3>
        <p className="text-sm text-lg mt-2 leading-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam illo
          labore ab recusandae assumenda illum aut sapiente enim, dolorem
          tempora.
        </p>
        <div className="flex mt-1">
          <p className="text-2xl font-bold grow">$100</p>
          <button className="bg-lime-200 hover:bg-lime-100 py-1 px-3 text-green-900 rounded-xl">
            +
          </button>
        </div>
      </div>
    </>
  );
}
