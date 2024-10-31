import { Link } from "react-router-dom";
import "./styles.css";

export default function CardIntroduction() {
  return (
    <div className="card-introduction">
      <h1>Seja Bem Vindo</h1>
      <div className="card-introduction-bottom">
        <p>
          Quer salvar sua lista de tarefas sem precisar ficar escrevendo com a
          mão?
        </p>
        <br />
        <p>
          Salve aqui com a gente e tenha um controle das suas tarefas do dia a
          dia.
        </p>
        <br />
        <p>Clique abaixo e comece agora</p>
      </div>
      <Link to="/list-tasks">
        <button>Clique Aqui</button>
      </Link>
    </div>
  );
}
