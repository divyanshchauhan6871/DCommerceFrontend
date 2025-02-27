import axios from "axios";
import { useEffect, useState } from "react";

export default function UseCategory() {
  const [category, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `https://dcommercebackned.onrender.com/api/v1/category/get-category`
      );
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return category;
}
