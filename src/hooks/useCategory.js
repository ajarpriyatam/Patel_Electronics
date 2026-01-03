import { useEffect, useState } from "react";
import axios from "../services/axios";
import { getCategoryUrl } from "../services/apiUrl";
import { ALL_CATEGORIES, CATEGORY_OPTIONS } from "../constants/categories";

const useCategory = () => {
  const [categories, setCategories] = useState(ALL_CATEGORIES);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(getCategoryUrl);
      setCategories(data?.category || ALL_CATEGORIES);
    } catch (error) {
      // Fallback to default categories if API fails
      setCategories(ALL_CATEGORIES);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
};

// Export category options for forms
export const useCategoryOptions = () => {
  return CATEGORY_OPTIONS;
};

export default useCategory;
