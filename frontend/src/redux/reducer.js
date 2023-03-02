import { combineReducers } from "redux";
import types from "./types";

import { initialState } from "./initial_state";

const loginReducer = (state = initialState.login, action) => {
  switch (action.type) {
    case types.SET_LOGEDIN:
      return {
        ...state,
        loggedIn: true,
      };
    case types.SET_LOGEDOUT:
      return {
        ...state,
        loggedIn: false,
      };
    case types.USER_LOGIN_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        loggedIn: true,
      };
    case types.USER_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

const registerReducer = (state = initialState.register, action) => {
  switch (action.type) {
    case types.REGISTER_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case types.REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

const profileReducer = (state = initialState.profile, action) => {
  switch (action.type) {
    case types.PROFILE_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.PROFILE_DATA:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case types.PROFILE_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.PROFILE_RESET:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};
const categoriesReducer = (state = initialState.categories, action) => {
  switch (action.type) {
    case types.CATEGORIES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.CATEGORIES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.CATEGORIES_RESET:
      return {
        ...state,
        list: null,
      };
    default:
      return state;
  }
};
const sourcesReducer = (state = initialState.sources, action) => {
  switch (action.type) {
    case types.SOURCES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.SOURCES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.SOURCES_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.SOURCES_RESET:
      return {
        ...state,
        list: null,
      };
    default:
      return state;
  }
};
const newsFeedReducer = (state = initialState.newsFeed, action) => {
  switch (action.type) {
    case types.NEWS_FEED_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.NEWS_FEED_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.NEWS_FEED_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.NEWS_FEED_RESET:
      return {
        ...state,
        list: null,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  profile: profileReducer,
  categories: categoriesReducer,
  sources: sourcesReducer,
  newsFeed: newsFeedReducer,
});

export default rootReducer;
