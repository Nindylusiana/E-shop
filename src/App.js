import React from "react";
import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Register from "./Pages/Register";
import { loginAction } from "./actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import Products from "./Pages/Products";
import { API_URL } from "./helper";
import Detail from "./Pages/Details";

function App() {
  const [loading, setLoading] = React.useState(true);

  const dispatch = useDispatch();

  const keepLogin = async () => {
    try {
      let getLocalStorage = JSON.parse(localStorage.getItem("eshop_login"));
      console.log(getLocalStorage);
      if (getLocalStorage.id) {
        let res = await Axios.get(API_URL + `/user?id=${getLocalStorage.id}`);
        delete res.data[0].password;
        dispatch(loginAction(res.data[0])); // menjalankan fungsi action
        setLoading(false); // loading dimatikan ketika berhasil mendapat response
        localStorage.setItem("eshop_login", JSON.stringify(res.data[0]));
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false); // loading dimatikan ketika berhasil mendapat response
    }
  };

  useEffect(() => {
    keepLogin();
  }, []);

  return (
    <div>
      <Navbar loading={loading} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regis" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/detail" element={<Detail />} /> 
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
