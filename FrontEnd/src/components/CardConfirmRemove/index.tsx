import { useTaskMutateDelete } from "../../hooks/useTaskDataMutate";
import "./styles.css";

interface CardConfirmeRemoveTaskProps {
  id: number;
  closeModal(): void;
}

export default function CardConfirmRemove({
  id,
  closeModal,
}: CardConfirmeRemoveTaskProps) {
  const { mutate } = useTaskMutateDelete();

  const confirmRemove = () => {
    mutate(id);
  };
  
  return (
    <div className="card-confirm-remove">
      <div className="card-confirm-remove-content">
        <h1>Tem certeza que deseja remover tarefa?</h1>
        <div className="cards-confirm-btns">
          <button onClick={confirmRemove}>Sim</button>
          <button onClick={closeModal}>Não</button>
        </div>
      </div>
    </div>
  );
}
