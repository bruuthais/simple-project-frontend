import {useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../../api/api";
import "../address/form.scss";
import Swal from "sweetalert2";
import {NavbarClient} from "../../../../utils/navbar/client-navbar/NavBarClient";

export function Profile() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  async function handleEditProfile(e: any) {
    e.preventDefault();
    await api
      .put(`/api/Customer/me`, {
        name: name,
        surname: surname,
        password: password,
        email: email,
      })
      .then(function (resposta) {
        Swal.fire({
          title: "Dados alterados",
          text: "Por favor faça novamente o login! :)",
          icon: "success",
          confirmButtonColor: "#4054b2",
          confirmButtonText: "OK",
        });
        localStorage.removeItem("jwtToken");
        history.push("/");
      })
      .catch(function (error) {
        toast.error("Preencha os dados corretamente");
      });
  }

  function handleDelete(e) {
    e.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "#4054b2",
        cancelButton: "#ff0000 ",
      },
    });

    swalWithBootstrapButtons
      .fire({
        title: "Você tem certeza?",
        text: "Não será possível recuperar a sua conta",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, pode deletar!",
        confirmButtonColor: "#ff0000",
        cancelButtonText: "Não, cancele!",
        cancelButtonColor: "#4054b2",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          api.delete("/api/Customer/me").then(function (resposta) {
            Swal.fire({
              title: "Conta deletada",
              text: "Sentiremos sua falta...",
              icon: "success",
              timer: 2500,
              showConfirmButton: false,
            });
            localStorage.removeItem("jwtToken");
            history.push("/");
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            title: "Cancelado",
            text: "Sua conta foi salva! :)",
            showConfirmButton: false,
            icon: "success",
          });
        }
      });
  }

  return (
    <div className="page-profile-restaurant">
      <NavbarClient />
      <main>
        <div className="profile-restaurant-content">
          <form className="form-profile-restaurant">
            <h3 className="h3-profile-restaurant">Editar Informações</h3>
            <div className="profile-restaurant">
              <p className="p-form-profile">Nome:</p>
              <input
                type="text"
                required
                className="input-img-restaurant"
                placeholder="insira um nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="p-form-profile">Sobrenome:</p>
              <input
                type="text"
                required
                className="input-img-restaurant"
                placeholder="insira um sobrenome"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              <p className="p-form-profile">Email:</p>
              <input
                type="email"
                required
                className="input-img-restaurant"
                placeholder="insira um email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <p className="p-form-profile">Senha:</p>
              <input
                type="password"
                required
                className="input-img-restaurant"
                placeholder="insira ima senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="profile-adress-restaurant"></div>

            <button
              className="button-profile-restaurant"
              onClick={handleEditProfile}
            >
              salvar perfil
            </button>
            <>
              <button className="button-profile-delete" onClick={handleDelete}>
                excluir conta
              </button>
            </>
            <ToastContainer />
          </form>
        </div>
      </main>
    </div>
  );
}
