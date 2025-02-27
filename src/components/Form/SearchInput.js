import React from "react";
import { useSearch } from "../../context/SearchContext.js";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://dcommercebackned.onrender.com/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      console.log(data);
      navigate("/search");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group d-flex mx-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search here"
          onChange={(e) => {
            setValues({ ...values, keyword: e.target.value });
          }}
        />

        <button type="submit" className="btn btn-success mx-2">
          Submit
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
