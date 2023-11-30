import HeroFirst from "../components/Hero/HeroFirst";
import HeroSecond from "../components/Hero/HeroSecond";
import Commitment from "../components/Commitment";
import Missions from "../components/Missions";

const MissionsList = [
  {
    image:
      "https://images.pexels.com/photos/17752016/pexels-photo-17752016/free-photo-of-smiling-couple-on-camping.jpeg",
    title: "Mengurangi Pemborosan Makanan",
    description: "Misi pertama kami adalah mengurangi pemborosan makanan dengan melibatkan bisnis kuliner dan toko makanan dalam redistribusi makanan sisa kepada mereka yang membutuhkan. Kami akan membentuk kemitraan yang kuat dengan pelaku industri makanan, menyusun pedoman distribusi yang aman, dan membangun platform web user-friendly.",
  },
  {
    image: "https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg",
    title: "Menciptakan Akses Makanan yang Adil dan Berkelanjutan",
    description:
      "Misi kedua kami adalah menciptakan akses makanan yang adil dan berkelanjutan melalui pengembangan platform web. Kami akan memastikan inklusivitas platform dengan memperhatikan aksesibilitas bagi semua lapisan masyarakat. Dengan berkolaborasi dengan LSM dan komunitas, kami ingin memastikan bahwa makanan yang didistribusikan mencapai mereka yang paling membutuhkan.",
  },
];

const AboutUs = () => {
  return (
    <section>
      <HeroFirst />
      <Commitment />
      <HeroSecond />
      <section className="mb-24">
        {MissionsList.map((mission) => {
          return (
            <Missions
              key={mission.title}
              image={mission.image}
              title={mission.title}
            >
              {mission.description.split("/n").map((child, index) => {
                return (
                  <p className="font-light text-md mb-3" key={index}>
                    {child}
                  </p>
                );
              })}
            </Missions>
          );
        })}
      </section>
    </section>
  );
};

export default AboutUs;
