import { Container } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import MealsCard from "./MealsCard";
import axios from "axios";
import { useState, useEffect } from "react";
import GLOBAL_ROUTE from "../../helpers/GlobalRoute";

const Meals = () => {
  const [mealsData, setMealsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMealsData = async () => {
      try {
        const response = await axios.get(`${GLOBAL_ROUTE}/api/v1/meals`);
        const data = response.data;
        setIsLoading(false);
        setMealsData(data.data.meals);
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
      <section className="block md:grid grid-cols-3 gap-6">
        {mealsData.map((meal) => {
          return <MealsCard key={meal.id} {...meal}/>;
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

export default Meals;
