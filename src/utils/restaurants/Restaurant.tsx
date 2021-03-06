import {useHistory} from "react-router-dom";
import api from "../../api/api";
import "./style.scss";

export function Restaurant(props: any) {
  const history = useHistory();
  function handleRestaurantId(id: any) {
    api
      .get(`/api/Customer/restaurants/${props.id}`)
      .then(function (resposta) {
        history.push(`/home/restaurant/${props.id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <>
      <div className="content">
        <button
          onClick={handleRestaurantId}
          className={
            props.isOpen ? "restaurant-list" : "restaurant-list-closed"
          }
        >
          <div className="restaurant-list-img">
            <img
              className="restaurant-img-logo"
              src={props.logoUrl}
              alt="imagem do restaurante"
            ></img>
          </div>
          <div className="restaurants-list-box">
            <div className="restaurants-list-name">
              <h3 className="h3-restaurants-name"> {props.name}</h3>
            </div>
            <div
              className={
                props.isOpen
                  ? "restaurant-list-is-open"
                  : "restaurant-list-is-closed"
              }
            >
              {props.isOpen ? <p>Aberto</p> : <p>Fechado</p>}
            </div>
          </div>
        </button>
      </div>
    </>
  );
}
