import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Container,
  Spinner,
  Badge,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import GLOBAL_ROUTE from "../../helpers/GlobalRoute";
import axios from "axios";
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { timeIndonesia } from "../../helpers/StringHelpers";
import MealsCard from "../Meals/MealsCard";

const RetailerDetail = ({ retailerId }) => {
  const [mealsData, setMealsData] = useState([]);
  const [retailerData, setRetailerData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRetailerData = async () => {
      try {
        const response = await axios.get(
          `${GLOBAL_ROUTE}/api/v1/retailers/${retailerId}`,
        );
        const data = response.data;
        setRetailerData(data.data.retailers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching retailer data:", error);
      }
    };
    getRetailerData();

    const getMealsData = async () => {
      try {
        const response = await axios.get(
          `${GLOBAL_ROUTE}/api/v1/meals/retailer/${retailerId}`,
        );
        const data = response.data;
        setMealsData(data.data.meals);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching meals data:", error);
      }
    };

    getMealsData();
  }, [retailerId]);

  const retailerImage = `${GLOBAL_ROUTE}/img/${
    retailerData.image
      ? `retailers/${retailerData.image}`
      : "meals/pexels-engin-akyurt-1907642.jpg"
  }`;

  const convertedTime = `${timeIndonesia(
    retailerData.open_time,
  )} WIB - ${timeIndonesia(retailerData.close_time)} WIB`;

  const Loading = () => {
    return (
      <div className="flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  };

  const statusColor = (status) => {
    const statusHandler = status === "active";
    return {
      color: statusHandler ? "green" : "red",
      status: statusHandler ? "Buka" : "Tutup",
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

  const resMeals = (datas) => {
    if (datas.length === 0) {
      return <p className="text-lg">Tidak ada makanan</p>;
    }

    return (
      <section className="block md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {datas.map((data) => {
          return <MealsCard key={data.id} {...data} />;
        })}
      </section>
    );
  };

  const Component = () => {
    return (
      <section>
        <Breadcrumb
          spacing="8px"
          separator={<h4 className="text-xs lg:text-lg font-semibold">{"•"}</h4>}
          className="mb-4"
        >
          <BreadcrumbItem>
            <Link to="/retailers">
              <h4 className="text-xs lg:text-lg font-semibold hover:text-[#2F855A]">
                Cari Tempat
              </h4>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <Link to="./">
              <h4 className="text-xs lg:text-lg font-semibold text-[#38A169]">
                {retailerData.name}
              </h4>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <img
          src={retailerImage}
          alt={retailerData.name}
          className="w-full max-h-72 object-cover rounded-xl"
        />
        <h1 className="font-bold text-3xl md:text-5xl mt-5 mb-3">
          {retailerData.name}
        </h1>
        <Badge colorScheme={statusColor(retailerData.status).color}>
          {statusColor(retailerData.status).status}
        </Badge>
        <section className="block lg:flex items-center mb-5 mt-3">
          <div className="mb-1 lg:mb-0 lg:mr-5 flex items-center justify-start">
            <FaRegClock />
            <p className="text-lg font-medium ml-2">{convertedTime}</p>
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
        {description(retailerData.description)}
        <Divider />
        <h2 className="font-semibold text-2xl my-6">Daftar Makanan</h2>
        {resMeals(mealsData)}
      </section>
    );
  };

  return (
    <Container maxW={"6xl"} className="mt-10 md:mt-20 px-3">
      {isLoading ? <Loading /> : <Component />}
    </Container>
  );
};

RetailerDetail.propTypes = {
  retailerId: PropTypes.number.isRequired,
};

export default RetailerDetail;
