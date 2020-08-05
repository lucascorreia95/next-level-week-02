import React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="" alt="" />
        <div>
          <strong>Diego Fernandes</strong>
          <span>Quimica</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de quimica avancada.
        <br />
        <br />
        Apaixonado por explodir coisas em laboratorios e por mudar a vida das
        pessoas atraves de experiencias.
      </p>

      <footer>
        <p>
          Preco/Hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;
