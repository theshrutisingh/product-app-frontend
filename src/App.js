import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ProductForm from "./ProductForm";
import './styles/main.css';
import AddEditProduct from "./AddEditProduct";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEditProduct />} />
        <Route path="/edit/:id" element={<AddEditProduct />} />


      </Routes>
  );
}

export default App;
