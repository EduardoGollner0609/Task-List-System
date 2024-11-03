import "./styles.css";

interface ErrorCardProps {
  message: string;
  closeModal(): void;
}

export default function CardError({ message, closeModal }: ErrorCardProps) {
  return (
    <div className="card-error">
      <div className="card-error-top-exit" onClick={closeModal}>
        <ion-icon name="backspace-outline"></ion-icon>
        <p>Fechar</p>
      </div>
      <div className="card-error-bottom">
        <h1>Erro: {message}</h1>
      </div>
    </div>
  );
}
