import { Container } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import RetailersCard from "./RetailersCard";
import axios from "axios";
import { useState, useEffect } from "react";
import GLOBAL_ROUTE from "../../helpers/GlobalRoute";

const Retailers = () => {
  const [retailersData, setRetailersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRetailersData = async () => {
      try {
        const response = await axios.get(`${GLOBAL_ROUTE}/api/v1/retailers`);
        const data = response.data;
        setIsLoading(false);
        setRetailersData(data.data.retailers);
      } catch (error) {
        console.error("Error fetching retailers data:", error);
      }
    };
    getRetailersData();
  }, []);

  const Loading = () => {
    return (
      <div className="flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  };

  const Component = () => {
    return (
      <section className="block md:grid grid-cols-3 gap-6">
        {retailersData.map((retailer) => {
          return <RetailersCard key={retailer.id} {...retailer} />;
        })}
      </section>
    );
  };

  return (
    <Container maxW="7xl" className="pt-24">
      {isLoading ? <Loading /> : <Component />}
    </Container>
  );
};

export default Retailers;
