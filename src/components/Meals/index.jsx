import { Container, Spinner, Input, Button } from "@chakra-ui/react";
import MealsCard from "./MealsCard";
import axios from "axios";
import { useState, useEffect } from "react";
import GLOBAL_ROUTE from "../../helpers/GlobalRoute";
import { FiSearch } from "react-icons/fi";

const Meals = () => {
  const [mealsData, setMealsData] = useState([]);
  const [mealsDataFiltered, setMealsDataFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const searchHandler = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value === "") {
      setMealsDataFiltered(mealsData);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      filterSubmitHandler();
    }
  };

  const filterSubmitHandler = () => {
    setMealsDataFiltered(
      mealsData.filter((meal) => {
        const { name, description } = meal;
        const { name: retailerName, location } = meal.retailer;
        return `${name} ${description} ${retailerName} ${location}`
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      }),
    );
  };

  useEffect(() => {
    const getMealsData = async () => {
      try {
        const response = await axios.get(`${GLOBAL_ROUTE}/api/v1/meals`);
        const data = response.data;
        setIsLoading(false);
        setMealsData(data.data.meals);
        setMealsDataFiltered(data.data.meals);
      } catch (error) {
        console.error("Error fetching meals data:", error);
      }
    };
    getMealsData();
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
      <section className="block md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mealsDataFiltered.map((meal) => {
          return <MealsCard key={meal.id} {...meal} />;
        })}
      </section>
    );
  };

  return (
    <Container maxW="6xl" className="mt-10 md:mt-20 px-3">
      <h1 className="font-bold text-3xl md:text-5xl mb-5">
        Ada Apa di Turahan
      </h1>
      <p className="text-lg mb-5">Temukan berbagai macam makanan di sini</p>
      <div className="flex items-center justify-start max-w-xl mb-8">
        <Input
          placeholder="Cari makanan"
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
      {(mealsDataFiltered.length === 0 && !isLoading) && (
        <p className="text-lg">Tidak ada makanan yang ditemukan</p>
      )}
      
    </Container>
  );
};

export default Meals;
