import Image from "next/image";

const HeaderImg = () => (
  <div className="relative h-24 m-8 overflow-hidden bg-emerald-500 rounded-lg">
    <div className="absolute z-30 flex w-full h-full">
      <div className="relative z-30 w-5/6 px-6 py-8 text-white md:py-10 md:w-1/2">
        <h2 className="text-3xl text-emerald-900">Tiny Shop</h2>
        <span></span>
      </div>
      <div className="absolute top-0 right-0 flex w-full h-full">
        <div className="w-1/3 h-full bg-emerald-300"></div>
        <div className="relative w-1/3">
          <svg
            fill="currentColor"
            viewBox="0 0 100 100"
            className="absolute inset-y-0 z-20 h-full text-emerald-300"
          >
            <polygon id="diagonal" points="0,0 100,0 50,100 0,100"></polygon>
          </svg>
          <svg
            fill="currentColor"
            viewBox="0 0 100 100"
            className="absolute inset-y-0 z-10 h-full ml-6 text-white opacity-50"
          >
            <polygon points="0,0 100,0 50,100 0,100"></polygon>
          </svg>
        </div>
      </div>
    </div>
    <div className="absolute top-0 right-0 block w-9/12 h-full">
      <Image
        priority
        src="/images/bg.png"
        alt=""
        width="0"
        height="0"
        sizes="100vw"
        className="object-cover rounded-lg  h-full min-w-full"
      />
    </div>
  </div>
);

export default HeaderImg;
