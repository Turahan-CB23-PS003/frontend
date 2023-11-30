import axios from "axios";
import RetailersCard from "../components/Retailers/RetailersCard";
import { useState, useEffect } from "react";

const Retailers = () => {
  const [retailersData, setRetailersData] = useState([]);

  useEffect(() => {
    const getRetailersData = async () => {
      try {
        const response = await axios.get(
          "https://turahan-run-rad3c73vaa-et.a.run.app/api/v1/retailers",
        );
        const data = response.data;
        console.log(data);
        setRetailersData(data.data.retailers);
      } catch (error) {
        console.error("Error fetching retailers data:", error);
      }
    };
    getRetailersData();
  }, []);

  return (
    <div>
      {retailersData.map((retailer) => {
        return (
          <RetailersCard
            key={retailer.id}
            name={retailer.name}
            status={retailer.status}
            openTime={retailer.openTime}
            closeTime={retailer.closeTime}
            location={retailer.location}
            gmaps={retailer.gmaps}
            contactprofileImage={retailer.contact.profileImage}
            profileImage={retailer.profileImage}
            bgImage={retailer.bgImage}
            description={retailer.description}
          />
        );
      })}
    </div>
  );
};

export default Retailers;
