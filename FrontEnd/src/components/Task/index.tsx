import "./styles.css";

export default function Task() {
  return (
    <div className="card-task">
      <p>ID: 10</p>
      <p>Tarefa vem aqui e se for maior como ela se enquadra aqui</p>
      <p>Custo: R$20.00</p>
      <p>Data limite: 20/07/2024</p>
      <div className="card-task-icons">
        <ion-icon name="arrow-up-outline"></ion-icon>
        <ion-icon name="arrow-down-outline"></ion-icon>
      </div>
    </div>
  );
}
