// project imports
import Layout from "./components/Layout";
import CarNumbers from "./features/CarNumbers";
import Parking from "./features/parking";

const App = () => {
  return (
    <Layout>
      <Parking />
      <CarNumbers />
    </Layout>
  );
};

export default App;
