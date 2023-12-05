import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Spinner, Badge } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import GLOBAL_ROUTE from "../../helpers/GlobalRoute";
import axios from "axios";
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";
import { IoIosContact } from "react-icons/io";
import { timeIndonesia } from "../../helpers/StringHelpers";
import numeral from "numeral";

const MealDetail = ({ mealId }) => {
  const [mealData, setMealData] = useState({});
  const [retailerData, setRetailerData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMealData = async () => {
      try {
        const response = await axios.get(
          `${GLOBAL_ROUTE}/api/v1/meals/${mealId}`,
        );
        const data = response.data;
        setMealData(data.data.meals);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching meal data:", error);
      }
    };
    getMealData();

    const getRetailerData = async () => {
      try {
        const response = await axios.get(
          `${GLOBAL_ROUTE}/api/v1/retailers/${mealData.retailer_id}`,
        );
        const data = response.data;
        setRetailerData(data.data.retailers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching retailer data:", error);
      }
    };

    getRetailerData();
  }, [mealData.retailer_id, mealId]);

  const mealImage = `${GLOBAL_ROUTE}/img/meals/${
    mealData.image ? mealData.image : "pexels-engin-akyurt-1907642.jpg"
  }`;

  const retailerImage = `${GLOBAL_ROUTE}/img/${
    retailerData.image
      ? `retailers/${retailerData.image}`
      : "meals/pexels-engin-akyurt-1907642.jpg"
  }`;

  const convertedTime = `${timeIndonesia(
    retailerData.open_time,
  )} WIB - ${timeIndonesia(retailerData.close_time)} WIB`;

  const convertedPrice = `Rp${String(
    numeral(mealData.price).format("0,0"),
  ).replace(",", ".")}`;

  const Loading = () => {
    return (
      <div className="flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  };

  const statusColor =
    retailerData.status === "active"
      ? ["bg-green-400", "bg-green-500"]
      : ["bg-red-400", "bg-red-500"];

  const statusBadge = (status, retailerStatus) => {
    if (retailerStatus === "inactive") {
      return {
        color: "red",
        status: "Penyedia tutup",
      };
    }
    if (status === "inactive") {
      return {
        color: "red",
        status: "Makanan tidak tersedia",
      };
    }
    return {
      color: "green",
      status: "Makanan tersedia",
    };
  };

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

  const Component = () => {
    return (
      <section>
        <img
          src={mealImage}
          alt={mealData.name}
          className="w-full max-h-72 object-cover rounded-xl"
        />
        <h1 className="font-bold text-3xl md:text-5xl my-5">{mealData.name}</h1>
        <section className="flex items-center relative z-10 mb-5">
          <Link to={`/retailers/${retailerData.id}`}>
            <img
              src={retailerImage}
              alt="retailer"
              className="w-10 h-10 rounded-full"
            />
          </Link>
          <span className="relative flex h-3 w-3 right-3 top-3">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusColor[0]}`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${statusColor[1]}`}
            ></span>
          </span>
          <Link to={`/retailers/${retailerData.id}`}>
            <p className="text-2xl font-semibold drop-shadow-lg hover:text-[#48AF4A] transition-all ease-in duration-100">
              {retailerData.name}
            </p>
          </Link>
        </section>
        <section className="flex items-center mb-3">
          <Badge
            colorScheme={
              statusBadge(mealData.status, retailerData.status).color
            }
          >
            {statusBadge(mealData.status, retailerData.status).status}
          </Badge>
        </section>
        <section className="block lg:flex items-center mb-5">
          <div className="mb-1 lg:mb-0 lg:mr-5 flex items-center justify-start">
            <FaRegClock />
            <p className="text-lg font-medium ml-2">{convertedTime}</p>
          </div>
          <div className="mb-1 lg:mb-0 lg:mr-5 flex items-center justify-start">
            <AiOutlineDollar />
            <p className="text-lg font-medium ml-2">{convertedPrice}</p>
          </div>
          <Link
            to={retailerData.gmaps ? retailerData.gmaps : "./"}
            target="_blank"
          >
            <section className="mb-1 lg:mb-0 lg:mr-5 flex items-center">
              <MdOutlineLocationOn />
              <p className="text-lg ml-1">{retailerData.location}</p>
            </section>
          </Link>
          <section className="mb-1 lg:mb-0 lg:mr-5 flex items-center">
            <IoIosContact />
            <p className="text-lg ml-1">{retailerData.contact}</p>
          </section>
        </section>
        {description(mealData.description)}
      </section>
    );
  };

  return (
    <Container maxW={"6xl"} className="mt-10 md:mt-20 px-3">
      {isLoading ? <Loading /> : <Component />}
    </Container>
  );
};

MealDetail.propTypes = {
  mealId: PropTypes.number.isRequired,
};

export default MealDetail;
