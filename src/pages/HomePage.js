import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import MainSection from "../component/MainSection";
import ElectronicsCollections from "../component/collections/ElectronicsCollections";
import Recommendation from "../component/recommendation/Recommendations";
import WhyChooseUs from "../component/WhyChooseUs";
import Newsletter from "../component/Newsletter";
import CategoryShowcase from "../component/home/CategoryShowcase";
import BentoGrid from "../component/home/BentoGrid";
import { CATEGORIES } from "../constants/categories";
import DynamicProductShowcase from "../component/home/DynamicProductShowcase";
import BrandShowcase from "../component/home/BrandShowcase";
import { getAppleProducts } from "../actions/productAction";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const [appleProducts, setAppleProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppleProducts = async () => {
      try {
        const result = await dispatch(getAppleProducts());
        if (result.success) {
          setAppleProducts(result.products);
        } else {
          console.error("Error fetching apple products", result.error);
        }
      } catch (error) {
        console.error("Error fetching apple products", error);
      }
    };
    fetchAppleProducts();
  }, [dispatch]);
  console.log("appleProducts", appleProducts);

  return (
    <Layout>
      <MainSection />
      <ElectronicsCollections />

      <CategoryShowcase
        title="Audio"
        category={CATEGORIES.AUDIO || "Audio"}
      />

      <CategoryShowcase
        title="Gaming"
        category={CATEGORIES.GAMING || "Gaming"}
      />

      <BentoGrid />

      <CategoryShowcase
        title="Cameras"
        category={CATEGORIES.CAMERAS || "Camera"}
      />

      <DynamicProductShowcase
        title="Apple Products"
        products={appleProducts}
        bannerTitle="iPhone 15 Pro"
        bannerSubtitle="Titanium. So strong. So light. So Pro."
        bannerImage="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2070&auto=format&fit=crop"
        bannerLink="/product/ph001"
      />

      <CategoryShowcase
        title="Winter Sale Products"
        category={CATEGORIES.SMARTPHONES || "Smartphones"}
      />

      <Recommendation />
      <BrandShowcase />
      <WhyChooseUs />
      <Newsletter />
    </Layout>
  );
};

export default HomePage;
