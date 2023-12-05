import { useParams } from "react-router-dom";
import MealDetail from "../components/MealDetail";

const MealDetailPage = () => {
  const { mealId } = useParams();

  return (
    <section className="mb-24 px-2 md:px-0">
      <MealDetail mealId={Number(mealId)} />
    </section>
  );
};

export default MealDetailPage;
