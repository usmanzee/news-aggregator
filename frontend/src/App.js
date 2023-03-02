import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./screens/home";
import Login from "./screens/login";
import MainLayout from "./layout/main_layout";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import types from "./redux/types";
import Register from "./screens/register";

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.login.loggedIn);
  useEffect(() => {
    const tokenExists = localStorage.getItem("token") ? true : false;
    if (tokenExists) {
      dispatch({
        type: types.SET_LOGEDIN,
      });
    }
  }, []);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<MainLayout loggedIn={loggedIn} />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
