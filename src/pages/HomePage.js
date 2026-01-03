import React from "react";
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
import { SAMPLE_PRODUCTS } from "../data/sampleProducts";
import BrandShowcase from "../component/home/BrandShowcase";

const HomePage = () => {
  // Filter for Apple products for the showcase
  const appleProducts = SAMPLE_PRODUCTS.filter(p =>
    p.name.includes("iPhone") ||
    p.name.includes("MacBook") ||
    p.name.includes("AirPods") ||
    p.name.includes("Apple") ||
    p.name.includes("iPad")
  );

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
        category={CATEGORIES.CAMERAS || "Cameras"}
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
