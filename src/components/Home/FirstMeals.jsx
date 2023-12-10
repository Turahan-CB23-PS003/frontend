import { Spinner, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import MealsCard from "../Meals/MealsCard";
import axios from "axios";
import { useState, useEffect } from "react";
import GLOBAL_ROUTE from "../../helpers/GlobalRoute";

const FirstMeals = () => {
  const [mealsData, setMealsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMealsData = async () => {
      try {
        const response = await axios.get(`${GLOBAL_ROUTE}/api/v1/meals`);
        const data = response.data;
        setIsLoading(false);
        setMealsData(data.data.meals.slice(0, 3));
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
        {mealsData.map((meal) => {
          return <MealsCard key={meal.id} {...meal} />;
        })}
      </section>
    );
  };

  return (
    <section>
      <div className="block md:flex justify-between items-end mb-6">
        <div className="mb-5 md:mb-0">
          <h1 className="font-bold text-3xl md:text-5xl mb-3">Cari Makanan!</h1>
          <p className="text-lg">Tunggu apa lagi? Cari makanan di sini</p>
        </div>
        <Link to="/meals">
          <Button colorScheme="green">Lihat Semua</Button>
        </Link>
      </div>
      {isLoading ? <Loading /> : <Component />}
      {mealsData.length === 0 && !isLoading && (
        <p className="text-lg">Tidak ada makanan yang ditemukan</p>
      )}
    </section>
  );
};

export default FirstMeals;
