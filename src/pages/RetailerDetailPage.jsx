import { useParams } from "react-router-dom";
import RetailerDetail from "../components/RetailerDetail";

const RetailerDetailPage = () => {
  const { retailerId } = useParams();

  return (
    <section className="pt-20 mb-24 px-2 md:px-0">
      <RetailerDetail retailerId={Number(retailerId)} />
    </section>
  );
};

export default RetailerDetailPage;
