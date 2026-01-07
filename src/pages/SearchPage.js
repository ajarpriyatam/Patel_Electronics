import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import ProductCardColl from "../component/common/ProductCardColl";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../actions/productAction";
import { FaSearch } from "react-icons/fa";

const SearchPage = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const { products, loading, error } = useSelector((state) => state.products);

    // Filter products client-side
    const filteredProducts = products ? products.filter((product) => {
        const searchTerm = query.toLowerCase();
        return (
            (product.name && product.name.toLowerCase().includes(searchTerm)) ||
            (product.description && product.description.toLowerCase().includes(searchTerm)) ||
            (product.category && product.category.toLowerCase().includes(searchTerm)) ||
            (product.brand && product.brand.toLowerCase().includes(searchTerm))
        );
    }) : [];

    useEffect(() => {
        // Check if we already have products, if not (or if we want to ensure freshness), fetch them.
        // Optimization: check if products is empty or just fetch always to be safe.
        if (!products || products.length === 0) {
            dispatch(getProduct("all"));
        }
    }, [dispatch, products]);

    return (
        <Layout>
            <div className="min-h-[60vh] bg-white pt-20 pb-10 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                            Search Results
                        </h1>
                        <p className="text-gray-600">
                            Found {filteredProducts.length} results for "{query}"
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-[#D4A574] border-t-transparent rounded-full animate-spin"></div>
                                <div className="text-[#D4A574] text-lg">Searching...</div>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="text-red-500 text-lg">Error: {error}</div>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCardColl key={product._id} {...product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <FaSearch className="text-6xl text-gray-300 mb-4" />
                            <h2 className="text-2xl font-bold text-gray-700 mb-2">No results found</h2>
                            <p className="text-gray-500 max-w-md">
                                We couldn't find any products matching "{query}". Try checking your spelling or using different keywords.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default SearchPage;
