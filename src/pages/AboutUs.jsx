import HeroFirst from "../components/AboutUs/Hero/HeroFirst";
import HeroSecond from "../components/AboutUs/Hero/HeroSecond";
import Commitment from "../components/AboutUs/Commitment";
import Mission from "../components/AboutUs/Mission";

const MissionsList = [
  {
    image:
      "https://images.pexels.com/photos/17752016/pexels-photo-17752016/free-photo-of-smiling-couple-on-camping.jpeg",
    title: "Mengurangi Pemborosan Makanan",
    description:
      "Misi pertama kami adalah mengurangi pemborosan makanan dengan melibatkan bisnis kuliner dan toko makanan dalam redistribusi makanan sisa kepada mereka yang membutuhkan. Kami akan membentuk kemitraan yang kuat dengan pelaku industri makanan, menyusun pedoman distribusi yang aman, dan membangun platform web user-friendly.",
  },
  {
    image: "https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg",
    title: "Menciptakan Akses Makanan yang Adil dan Berkelanjutan",
    description:
      "Misi kedua kami adalah menciptakan akses makanan yang adil dan berkelanjutan melalui pengembangan platform web. Kami akan memastikan inklusivitas platform dengan memperhatikan aksesibilitas bagi semua lapisan masyarakat. Dengan berkolaborasi dengan LSM dan komunitas, kami ingin memastikan bahwa makanan yang didistribusikan mencapai mereka yang paling membutuhkan.",
  },
  {
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
    title: "Pendidikan dan Kesadaran Masyarakat",
    description:
      "Misi ketiga dalam proyek ini bertujuan untuk meningkatkan pendidikan dan kesadaran masyarakat tentang pentingnya mengurangi pemborosan makanan. Melalui kampanye edukatif dan kegiatan sosialisasi, kami berkomitmen untuk menyampaikan informasi tentang dampak negatif pemborosan makanan terhadap lingkungan dan masyarakat.",
  },
];

const AboutUs = () => {
  const description = (description) => {
    if (!description) {
      return <p className="text-lg mb-5">Tidak ada deskripsi</p>;
    }
    return description.split(/\n\n?/).map((item, index) => {
      return (
        <p key={index} className="text-lg mb-5">
          {item}
        </p>
      );
    });
  };

  return (
    <section>
      <HeroFirst />
      <Commitment />
      <HeroSecond />
      <section className="mb-24">
        {MissionsList.map((mission) => {
          return (
            <Mission
              key={mission.title}
              image={mission.image}
              title={mission.title}
            >
              {description(mission.description)}
            </Mission>
          );
        })}
      </section>
    </section>
  );
};

export default AboutUs;
