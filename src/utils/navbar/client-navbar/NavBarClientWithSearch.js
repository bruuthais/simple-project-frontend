import "./style.scss";
import {FiShoppingBag} from "react-icons/fi";

import {useHistory} from "react-router-dom";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import ImgLogo from "../../../assets/image/logo.svg";
import api from "../../../api/api";
import {MenuProfileUser} from "../restaurant-navbar/menus/MenuProfileUser";

export function NavBarClientWithSearch(props) {
  const [profile, setProfile] = useState([]);
  const history = useHistory();
  useEffect(() => {
    api.get("/api/Customer/me").then((response) => {
      const data = response.data;
      setProfile(data);
    });
  }, []);

  //Redireciona ao home
  function handleHome() {
    history.push("/home");
  }

  return (
    <header className="navbar-home-login">
      <div className="api-name">
        <div className="img-logo">
          <img
            className="img-logo"
            src={ImgLogo}
            alt="Logo"
            onClick={handleHome}
          />
        </div>
        <form className="header-search-restaurant">
          <input
            type="text"
            placeholder="buscar restaurantes"
            value={props.busca}
            onChange={(e) => props.setBusca(e.target.value)}
          />
        </form>
        <div className="types">
          <p className="username">Olá, {profile.name}</p>

          <MenuProfileUser size="1.2em" />

          <Link
            to={{pathname: "/bag", state: props.bagItems}}
            className="nav-react-icon nav-react-icon-cart"
          >
            <FiShoppingBag size="1.2em" />
          </Link>
        </div>
      </div>
    </header>
  );
}
