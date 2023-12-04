import { Container } from "@chakra-ui/react";
import Fade from "react-reveal/Fade";
import Banner from "./Banner";
import Mission from "./Mission";

const MissionsList = [
  {
    image:
      "https://images.pexels.com/photos/17752016/pexels-photo-17752016/free-photo-of-smiling-couple-on-camping.jpeg",
    title: "Mengurangi Pemborosan Makanan",
    description:
      "Misi pertama kami adalah mengurangi pemborosan makanan dengan melibatkan bisnis kuliner dan toko makanan dalam redistribusi makanan sisa kepada mereka yang membutuhkan.\nKami akan membentuk kemitraan yang kuat dengan pelaku industri makanan, menyusun pedoman distribusi yang aman, dan membangun platform web user-friendly.",
  },
  {
    image: "https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg",
    title: "Menciptakan Akses Makanan yang Adil dan Berkelanjutan",
    description:
      "Misi kedua kami adalah menciptakan akses makanan yang adil dan berkelanjutan melalui pengembangan platform web. Kami akan memastikan inklusivitas platform dengan memperhatikan aksesibilitas bagi semua lapisan masyarakat.\nDengan berkolaborasi dengan LSM dan komunitas, kami ingin memastikan bahwa makanan yang didistribusikan mencapai mereka yang paling membutuhkan.",
  },
  {
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
    title: "Pendidikan dan Kesadaran Masyarakat",
    description:
      "Misi ketiga dalam proyek ini bertujuan untuk meningkatkan pendidikan dan kesadaran masyarakat tentang pentingnya mengurangi pemborosan makanan.\nMelalui kampanye edukatif dan kegiatan sosialisasi, kami berkomitmen untuk menyampaikan informasi tentang dampak negatif pemborosan makanan terhadap lingkungan dan masyarakat.",
  },
];

const About = () => {
  return (
    <Container maxW="6xl" className="mt-10 md:mt-20">
      <Fade left>
        <h1 className="text-3xl md:text-5xl font-bold">About Us</h1>
        <Banner />
      </Fade>
      <Fade right>
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Our Missions</h2>
      </Fade>
      {MissionsList.map((mission, index) => {
        const fadeDirection = index % 2 === 0 ? "right" : "left";
        return (
          <Fade
            key={index}
            left={fadeDirection === "left"}
            right={fadeDirection === "right"}
          >
            <Mission image={mission.image} title={mission.title}>
              {mission.description.split("\n").map((child, index) => {
                return (
                  <p className="mb-3" key={index}>
                    {child}
                  </p>
                );
              })}
            </Mission>
          </Fade>
        );
      })}
    </Container>
  );
};

export default About;
