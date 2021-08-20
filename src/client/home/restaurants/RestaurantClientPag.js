import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import api from "../../../api/api";
import "./style.scss";
import {NavBarClient} from "../../../utils/navbar/client-navbar/NavBarClient";
import {ListMenu} from "../../../utils/list-menu/ListMenu";

export function RestaurantClientPag(props) {
  const [restaurant, setRestaurant] = useState([]);
  const {id} = useParams();
  useEffect(() => {
    api.get(`/api/Customer/restaurants/${id}`).then((response) => {
      const data = response.data;
      setRestaurant(data);
    });
  }, []);

  return (
    <div className="home">
      <NavBarClient />
      <div className="restaurant-box-container">
        <div className="top-box">
          <img
            className="banner-restaurant-box"
            src={restaurant.bannerUrl}
            alt="Banner do restaurante"
          />
          <div className="top-box-about">
            <h1 className="name-restaurant-box">
              <img
                className="logo-restaurant-box"
                src={restaurant.logoUrl}
                alt="Logo do restaurante"
              />
              {restaurant.name}
            </h1>

            <div className="top-text-box">
              <h2
                className={
                  restaurant.isOpen
                    ? "status-restaurant-open"
                    : "status-restaurant-closed"
                }
              >
                {restaurant.isOpen ? <p>Aberto</p> : <p>Fechado</p>}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="items-box">
        <div className="items-box-container">
          <h2 className="title-box">Cardápio</h2>
        </div>
      </div>
      <ListMenu />
    </div>
  );
}
