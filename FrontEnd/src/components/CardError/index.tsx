import "./styles.css";

export default function CardError(error: string) {
  return (
    <div className="card-error">
      <h1>Erro: {error}</h1>
    </div>
  );
}
