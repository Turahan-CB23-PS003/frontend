import {
  Container,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import GLOBAL_ROUTE from "../../helpers/GlobalRoute";
import { GlobalContext } from "../../App";
import AddRetailer from "./AddRetailer";
import AddMeal from "./AddMeal";
import EditRetailer from "./EditRetailer";
import EditMeal from "./EditMeal";
import RetailersCard from "../Retailers/RetailersCard";
import MealsCard from "../Meals/MealsCard";
import UserNoAuth from "../User/UserNoAuth";

const DashboardUser = () => {
  const { userIdToken } = useContext(GlobalContext);
  const { userId, userAccessToken } = userIdToken;
  const [retailersData, setRetailersData] = useState([]);
  const [mealsData, setMealsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresher, setRefresher] = useState(false);

  const spinnerBegin = (handler) => {
    if (isLoading) {
      return <Spinner size="xs" />;
    }
    if (handler === "retailers") {
      return retailersData.length;
    } else if (handler === "meals") {
      return mealsData.length;
    }
  };

  useEffect(() => {
    const getRetailersData = async () => {
      try {
        const response = await axios.get(`${GLOBAL_ROUTE}api/v1/retailers`);
        const data = response.data.data.retailers;
        const filteredData = data.filter((retailer) => {
          return Number(retailer.admin_id) === Number(userId);
        });
        setRetailersData(filteredData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching retailers data:", error);
      }
    };
    getRetailersData();

    const getMealsData = async () => {
      try {
        const response = await axios.get(`${GLOBAL_ROUTE}api/v1/meals`);
        const data = response.data.data.meals;
        const filteredData = data.filter((meal) => {
          return Number(meal.retailer.admin_id) === Number(userId);
        });
        setMealsData(filteredData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching meals data:", error);
      }
    };
    getMealsData();
  }, [userId, refresher]);

  if (!userId || !userAccessToken) {
    return <UserNoAuth />;
  }

  return (
    <Container maxW="6xl" className="mt-10 md:mt-20 px-3">
      <div className="mb-10">
        <h1 className="font-bold text-3xl md:text-5xl mb-5">Dashboard</h1>
        <p className="text-lg">Buat dan atur tempat dan makananmu di sini</p>
      </div>
      <Accordion allowMultiple>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <AccordionItem>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <h2 className="font-semibold text-xl">
                  Total Tempat: {spinnerBegin("retailers")}
                </h2>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                {retailersData.map((retailer) => {
                  return <RetailersCard key={retailer.id} {...retailer} />;
                })}
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <h2 className="font-semibold text-xl">
                  Total Makanan: {spinnerBegin("meals")}
                </h2>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                {mealsData.map((meal) => {
                  return (
                    <MealsCard
                      key={meal.id}
                      {...meal}
                      retailer={meal.retailer}
                    />
                  );
                })}
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AddRetailer refresher={refresher} setRefresher={setRefresher} />
          <AddMeal
            retailers={retailersData}
            refresher={refresher}
            setRefresher={setRefresher}
          />
          <EditRetailer
            retailers={retailersData}
            refresher={refresher}
            setRefresher={setRefresher}
          />
          <EditMeal
            meals={mealsData}
            refresher={refresher}
            setRefresher={setRefresher}
          />
        </section>
      </Accordion>
    </Container>
  );
};

export default DashboardUser;
