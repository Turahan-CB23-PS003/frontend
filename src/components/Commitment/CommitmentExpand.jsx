import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const CommitmentExpand = () => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple className="mt-5">
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Baca latar belakang kami
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <p className="font-light text-md mb-3">
            Setiap hari, banyak makanan yang masih layak makan dibuang dan
            menjadi limbah. Ini bukan hanya merugikan secara ekonomi, tetapi
            juga berdampak buruk terhadap lingkungan. Oleh karena itu, perlu
            upaya untuk mengurangi pemborosan makanan, dengan cara
            mendistribusikan makanan sisa yang masih layak makan kepada mereka
            yang membutuhkan.
          </p>
          <p className="font-light text-md mb-3">
            Menurut FAO, sekitar sepertiga dari semua makanan yang diproduksi di
            dunia untuk konsumsi manusia dibuang. Ini setara dengan sekitar 1,3
            miliar ton per tahun. Di sisi lain, masih ada banyak orang yang
            mengalami kelaparan. Pengembangan proyek ini bertujuan untuk
            menciptakan sebuah platform web yang memungkinkan restoran, kafe,
            hotel, masyarakat dan toko makanan lainnya untuk memposting makanan
            sisa mereka yang masih layak makan. Masyarakat dapat melihat
            postingan ini dan mengambil makanan tersebut secara gratis atau
            dengan harga yang sangat terjangkau.
          </p>
          <p className="font-light text-md mb-3">
            Melalui proyek ini, kami percaya bahwa setiap orang berhak
            mendapatkan akses ke makanan yang cukup, dan juga sebagai langkah
            awal dalam mengurangi limbah makanan. Selain itu, kami berharap
            dapat membantu mengurangi pemborosan makanan, pencemaran lingkungan,
            dan memberikan solusi bagi mereka yang membutuhkan.
          </p>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default CommitmentExpand;
