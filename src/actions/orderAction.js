import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
  PAYMENT_VERIFICATION_REQUEST,
  PAYMENT_VERIFICATION_SUCCESS,
  PAYMENT_VERIFICATION_FAIL,
} from "../constant/orderConstant";

import axios from "axios";
import axiosInstance from "../services/axios";

const client = axiosInstance || axios;

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Prefer project axios instance (it has baseURL + auth token)
    const { data } = await client.post("/order/new", order, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    return data;
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Something went wrong";
    dispatch({ type: CREATE_ORDER_FAIL, payload: message });
    throw error;
  }
};

export const paymentVerification = (verificationPayload) => async (dispatch) => {
  try {
    dispatch({ type: PAYMENT_VERIFICATION_REQUEST });
    const { data } = await client.post("/payment-verification", verificationPayload, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch({ type: PAYMENT_VERIFICATION_SUCCESS, payload: data });
    return data;
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Verification failed";
    dispatch({ type: PAYMENT_VERIFICATION_FAIL, payload: message });
    throw error;
  }
};

export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });
    const { data } = await client.get("/orders/me");
    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Something went wrong";
    dispatch({ type: MY_ORDERS_FAIL, payload: message });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
    const { data } = await client.get("/admin/orders");
    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Something went wrong";
    dispatch({ type: ALL_ORDERS_FAIL, payload: message });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await client.get(`/order/${id}`);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Something went wrong";
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};