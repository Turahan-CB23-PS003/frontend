import { Container, Spinner, Input, Button } from "@chakra-ui/react";
import RetailersCard from "./RetailersCard";
import axios from "axios";
import { useState, useEffect } from "react";
import GLOBAL_ROUTE from "../../helpers/GlobalRoute";
import { FiSearch } from "react-icons/fi";

const Retailers = () => {
  const [retailersData, setRetailersData] = useState([]);
  const [retailersDataFiltered, setRetailersDataFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const searchHandler = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value === "") {
      setRetailersDataFiltered(retailersData);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      filterSubmitHandler();
    }
  };

  const filterSubmitHandler = () => {
    setRetailersDataFiltered(
      retailersData.filter((retailer) => {
        const { name, description = "", location } = retailer;
        return `${name} ${description} ${location}`
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      }),
    );
  };

  useEffect(() => {
    const getRetailersData = async () => {
      try {
        const response = await axios.get(`${GLOBAL_ROUTE}/api/v1/retailers`);
        const data = response.data;
        setIsLoading(false);
        setRetailersData(data.data.retailers);
        setRetailersDataFiltered(data.data.retailers);
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
        {retailersDataFiltered.map((retailer) => {
          return <RetailersCard key={retailer.id} {...retailer} />;
        })}
      </section>
    );
  };

  return (
    <Container maxW="6xl" className="mt-10 md:mt-20 px-3">
      <h1 className="font-bold text-3xl md:text-5xl mb-5">
        Ada Apa di Turahan
      </h1>
      <p className="text-lg mb-5">
        Temukan berbagai macam penyedia makanan dan donatur di sini
      </p>
      <div className="flex items-center justify-start max-w-xl mb-8">
        <Input
          placeholder="Basic usage"
          className="mr-2"
          value={searchValue}
          onChange={searchHandler}
          onKeyDown={handleKeyPress}
        />
        <Button variant="outline" onClick={filterSubmitHandler}>
          <FiSearch className="text-2xl text-[#4B5669] cursor-pointer" />
        </Button>
      </div>
      {isLoading ? <Loading /> : <Component />}
      {(retailersDataFiltered.length === 0 && !isLoading) && (
        <p className="text-lg">Tidak ada tempat yang ditemukan</p>
      )}
    </Container>
  );
};

export default Retailers;
