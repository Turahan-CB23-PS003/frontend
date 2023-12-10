import { useState } from "react";

const Usage = () => {
  const images = [
    "https://images.pexels.com/photos/1542252/pexels-photo-1542252.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/5648066/pexels-photo-5648066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  const [current, setCurrent] = useState(1);
  const [currentImage, setCurrentImage] = useState(images[0]);

  const handleCurrent = (num) => {
    setCurrent(num);
    setCurrentImage(images[num - 1]);
  };

  return (
    <section>
      <h1 className="font-bold text-3xl md:text-5xl mb-5">
        Cara menggunakan Turahan
      </h1>
      <p className="text-lg mb-5">Tata cara mudah menggunakan Turahan</p>
      <div className="block md:grid grid-cols-2 gap-10">
        <div>
          <div
            className={`${
              current === 1 ? "bg-[#38A169] text-white" : "text-black"
            } p-5 h-24 flex items-center rounded-3xl cursor-pointer`}
            onClick={() => handleCurrent(1)}
          >
            <h3 className="font-bold text-2xl">1. Cari makanan atau tempat</h3>
          </div>
          <div
            className={`${
              current === 2 ? "bg-[#38A169] text-white" : "text-black"
            } p-5 h-24 flex items-center rounded-3xl cursor-pointer`}
            onClick={() => handleCurrent(2)}
          >
            <h3 className="font-bold text-2xl">
              2. Catat jam buka untuk makanan sisa
            </h3>
          </div>
          <div
            className={`${
              current === 3 ? "bg-[#38A169] text-white" : "text-black"
            } p-5 h-24 flex items-center rounded-3xl cursor-pointer`}
            onClick={() => handleCurrent(3)}
          >
            <h3 className="font-bold text-2xl">
              3. Datang di waktu yang ditentukan
            </h3>
          </div>
          <div
            className={`${
              current === 4 ? "bg-[#38A169] text-white" : "text-black"
            } p-5 h-24 flex items-center rounded-3xl cursor-pointer`}
            onClick={() => handleCurrent(4)}
          >
            <h3 className="font-bold text-2xl">4. Ambil atau beli makananmu</h3>
          </div>
        </div>
        <img
          src={currentImage}
          alt="img"
          className="hidden md:block rounded-3xl object-cover h-full mt-10 md:mt-0"
        />
      </div>
    </section>
  );
};

export default Usage;
