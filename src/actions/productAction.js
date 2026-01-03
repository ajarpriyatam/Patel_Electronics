import axiosInstance from "../services/axios";
import axios from "axios";

import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_ADMIN_PRODUCT_FAIL,
  ALL_ADMIN_PRODUCT_REQUEST,
  ALL_ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  TOP_PRODUCTS_REQUEST,
  TOP_PRODUCTS_SUCCESS,
  TOP_PRODUCTS_FAIL,
  NEW_ARRIVALS_REQUEST,
  NEW_ARRIVALS_SUCCESS,
  NEW_ARRIVALS_FAIL,
  CLEAR_ERRORS,
} from "../constant/productConstant";

export const getProduct = (category) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    console.log("azsxdcd category", category);
    let link;
    if (category !== "all") {
      link = `/api/v2/products/category/${category}`;
    } else {
      link = `/api/v2/products`;
    }
    console.log("azsxdcd link", link);
    const { data } = await axios.get(link)
    console.log("azsxdcd data", data);
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: {
        visibleProducts: data.products,
        visibleProductscount: data.productsCount
      },
    })
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response?.data?.message || error.message || "Failed to fetch products",
    });
  }
}

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `/api/v2/admin/product/new`,
      productData,
      config
    );
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    let productDetails = await axios.get(`/api/v2/product/${id}`);
    console.log("azsxdcd productDetails ACtion ", productDetails);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: productDetails.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};

export const getAllProductsAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ADMIN_PRODUCT_REQUEST });
    let link = `/api/v2/admin/products`;
    const { data } = await axios.get(link)
    dispatch({
      type: ALL_ADMIN_PRODUCT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ALL_ADMIN_PRODUCT_FAIL,
      payload: error.response?.data?.message || error.message || "Failed to fetch admin products",
    });
  }
}

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const { data } = await axios.delete(`/admin/product/${id}`);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response?.data?.message || "Failed to delete product",
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearDeleteSuccess = () => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_RESET });
};

export const getTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: TOP_PRODUCTS_REQUEST });

    const { data } = await axios.get('/api/v2/products/top');

    dispatch({
      type: TOP_PRODUCTS_SUCCESS,
      payload: {
        products: data.products,
        productsCount: data.productsCount,
      }
    });
  } catch (error) {
    dispatch({
      type: TOP_PRODUCTS_FAIL,
      payload: error.response?.data?.message || "Failed to fetch top products",
    });
  }
};

export const getNewArrivals = () => async (dispatch) => {
  try {
    dispatch({ type: NEW_ARRIVALS_REQUEST });

    const { data } = await axios.get('/api/v2/products/new-arrival');

    dispatch({
      type: NEW_ARRIVALS_SUCCESS,
      payload: {
        products: data.products,
        productsCount: data.productsCount,
      }
    });
  } catch (error) {
    dispatch({
      type: NEW_ARRIVALS_FAIL,
      payload: error.response?.data?.message || "Failed to fetch new arrivals",
    });
  }
};