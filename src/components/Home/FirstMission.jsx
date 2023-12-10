import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const FirstMission = () => {
  const sendProps = {
    image:
      "https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Sedikit Mengenai Kami",
    description:
      "Pemborosan makanan berdampak negatif pada lingkungan, ekonomi, dan masyarakat. Turahan berupaya mengatasi masalah ini dengan menghubungkan sumber makanan berlebih dari restoran, hotel, dan donatur dengan mereka yang membutuhkan. Komunitas Turahan melibatkan pemberi makanan yang menyumbangkan makanan tidak terpakai dan penerima manfaat yang mencakup orang miskin, tunawisma, dan korban bencana. Dengan demikian, Turahan menciptakan komunitas peduli yang mengurangi pemborosan makanan dan mendukung mereka yang kurang mampu.",
  };
  return (
    <section className="block md:grid grid-cols-2 gap-12 lg:gap-28 mb-10">
      <img
        src={sendProps.image}
        className="mb-10 md:mb-0 rounded-3xl w-full h-full object-cover"
        loading="lazy"
      />
      <div className="flex flex-col justify-center">
        <h2 className="font-bold text-3xl mb-5">{sendProps.title}</h2>
        <p className="mb-5">{sendProps.description}</p>
        <Link to="/about">
          <Button colorScheme="green">Baca Lebih Lanjut</Button>
        </Link>
      </div>
    </section>
  );
};

export default FirstMission;
