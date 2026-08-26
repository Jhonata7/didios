import { useContext } from "react";

import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import CategorySection from "../components/CategorySection";
import BestSellers from "../components/BestSellers";
import FeaturedProducts from "../components/FeaturedProducts";
import Newsletter from "../components/Newsletter";

import { SearchContext } from "../context/SearchContext";

export default function Home() {
  const {
    search,
    setSearch,
    category,
    setCategory,
  } = useContext(SearchContext);

  return (
    <>
      <Hero />

      <section
        id="catalogo"
        className="max-w-7xl mx-auto px-6 mt-14 mb-8"
      >
        <SearchBar
          value={search}
          onChange={setSearch}
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-10">
        <Filters
          selected={category}
          onSelect={setCategory}
        />
      </section>

      <CategorySection />

      <BestSellers
        search={search}
        category={category}
      />

      <FeaturedProducts
        search={search}
        category={category}
      />

      <Newsletter />
    </>
  );
}