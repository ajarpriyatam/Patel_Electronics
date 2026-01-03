import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import {
  newProductReducer,
  productDetailsReducer,
  productsReducer,
  productsReducerAdmin,
  deleteProductReducer,
  topProductsReducer,
  newArrivalsReducer
} from "./reducers/productReducers";
// import { products } from "./constants";
// import {
//   profileReducer,
//   userReducer,
// } from "./reducers/userReducres";
import {
  allOrdersReducer,
  myOrdersReducer,
  orderDetailsReducer,
} from "./reducers/orderReducers";
import { newOrderReducer, paymentVerificationReducer } from "./reducers/orderReducers";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  // user: userReducer,
  // profile: profileReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newOrder: newOrderReducer,
  paymentVerification: paymentVerificationReducer,
  newProduct: newProductReducer,
  productsAdmin: productsReducerAdmin,
  deleteProduct: deleteProductReducer,
  allOrders: allOrdersReducer,
  topProducts: topProductsReducer,
  newArrivals: newArrivalsReducer,
});

const middleware = [thunk];

// Compose Redux DevTools with middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);


export default store;