import types from "./types";
import { API } from "../api";
import { getToken, setToken, removeToken } from "../utils/common";
import { message } from "antd";

export const handleError = (error, navigate, dispatch) => {
  if (error.code === 403) {
    removeToken();
    // navigate("/unauthorized");
    navigate("/login");
  }
  message.error(error.message || "Something went wrong.");
};

export const loginAction = (navigate, requestData) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_LOGIN_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Accept: "application/json" },
    };
    const response = await API.post(config)("/api/login", requestData);
    setToken(response.token);
    dispatch({
      type: types.USER_LOGIN_SUCCESS,
    });
    navigate("/", { replace: true });
    message.success("Logged In.");
    // navigate(-1);
  } catch (error) {
    dispatch({
      type: types.USER_LOGIN_ERROR,
    });
    console.log(error);
    handleError(error, navigate, dispatch);
  }
};
export const registerAction = (navigate, requestData) => async (dispatch) => {
  try {
    dispatch({
      type: types.REGISTER_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Accept: "application/json" },
    };
    await API.post(config)("/api/register", requestData);
    dispatch({
      type: types.REGISTER_SUCCESS,
    });
    navigate("/login", { replace: true });
    message.success("You have been registered successfully.");
  } catch (error) {
    dispatch({
      type: types.REGISTER_ERROR,
    });
    handleError(error, navigate, dispatch);
  }
};
export const logoutAction = (navigate) => async (dispatch) => {
  dispatch({
    type: types.SET_LOGEDOUT,
  });
  removeToken();
};

export const getProfileAction = (navigate) => async (dispatch) => {
  try {
    dispatch({
      type: types.PROFILE_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getToken(),
      },
    };
    const response = await API.get(config)("/api/profile");
    dispatch({
      type: types.PROFILE_DATA,
      payload: response.data,
    });
  } catch (error) {
    handleError(error, navigate, dispatch);
    dispatch({
      type: types.PROFILE_ERROR,
    });
  }
};

export const getCategoriesAction = (navigate) => async (dispatch) => {
  try {
    dispatch({
      type: types.CATEGORIES_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getToken(),
      },
    };
    const response = await API.get(config)("/api/categories");
    dispatch({
      type: types.CATEGORIES_DATA,
      payload: response.data,
    });
  } catch (error) {
    handleError(error, navigate, dispatch);
    dispatch({
      type: types.CATEGORIES_ERROR,
    });
  }
};

export const getSourcesAction = (navigate) => async (dispatch) => {
  try {
    dispatch({
      type: types.SOURCES_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getToken(),
      },
    };
    const response = await API.get(config)("/api/sources");
    dispatch({
      type: types.SOURCES_DATA,
      payload: response.data,
    });
  } catch (error) {
    handleError(error, navigate, dispatch);
    dispatch({
      type: types.SOURCES_ERROR,
    });
  }
};

export const getNewsFeedAction =
  (navigate, searchQuery, fromDate, toDate, category, sources) =>
  async (dispatch) => {
    try {
      dispatch({
        type: types.NEWS_FEED_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      };

      var url = "/api/news-feed";
      // //Nothing
      // if (!searchQuery && !fromDate && !toDate && !category && !sources) {
      //   url += "?country=us";
      // }

      // // Nothing just category
      // if (!searchQuery && !fromDate && !toDate && category && !sources) {
      //   url += `?category=${category}`;
      // }

      // // search query with date and sources
      // if (searchQuery && searchQuery !== "") {
      //   url += `?query=${searchQuery}`;
      //   if (fromDate && toDate && fromDate !== "" && toDate !== "") {
      //     url += `&from=${fromDate}&to=${toDate}`;
      //   }
      //   if (sources) {
      //     url += `&sources=${sources}`;
      //   }
      // }

      // //just sources
      // if (sources && !searchQuery) {
      //   url += `?sources=${sources}`;
      // }

      const reqData = {
        searchQuery: searchQuery,
        fromDate: fromDate,
        toDate: toDate,
        category: category,
        sources: sources,
      };

      console.log(url);
      const response = await API.post(config)(url, reqData);
      dispatch({
        type: types.NEWS_FEED_DATA,
        payload: response.data,
      });
    } catch (error) {
      handleError(error, navigate, dispatch);
      dispatch({
        type: types.NEWS_FEED_ERROR,
      });
    }
  };
