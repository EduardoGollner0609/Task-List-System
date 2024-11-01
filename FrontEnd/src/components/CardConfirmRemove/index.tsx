import "./styles.css";

export default function CardConfirmRemove() {
  return (
    <div className="card-confirm-remove">
      <div className="card-confirm-remove-content">
        <h1>Tem certeza que deseja remover tarefa?</h1>
        <div className="cards-confirm-btns">
          <button>Sim</button>
          <button>Não</button>
        </div>
      </div>
    </div>
  );
}
