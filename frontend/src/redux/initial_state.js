const loginState = {
  loggedIn: false,
  loading: false,
  success: false,
  error: false,
};

const registerState = {
  loading: false,
  success: false,
  error: false,
};

const profileState = {
  loading: false,
  data: null,
};

const categoriesState = {
  loading: false,
  list: [],
};
const sourcesState = {
  loading: false,
  list: [],
};

const newsFeedState = {
  loading: false,
  list: [],
};

const initialState = {
  login: loginState,
  register: registerState,
  profile: profileState,
  categories: categoriesState,
  sources: sourcesState,
  newsFeed: newsFeedState,
};

export { initialState };
