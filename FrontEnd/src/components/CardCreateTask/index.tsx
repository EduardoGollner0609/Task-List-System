import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { useTaskDataMutate } from "../../hooks/useTaskDataMutate";
import { TaskData } from "../../interface/TaskData";
import CardError from "../CardError";

interface CardCreateTaskProps {
  closeModal(): void;
}

export default function CardCreateTask({ closeModal }: CardCreateTaskProps) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState<string>();
  const [limitDate, setLimitDate] = useState("");
  const [limitTime, setLimitTime] = useState("");
  const { mutateAsync } = useTaskDataMutate();
  const [isCardErrorModalOpen, setIsCardErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleOpenModalError = () => {
    setIsCardErrorModalOpen((prev) => !prev);
  };

  function validated(taskData: TaskData) {
    if (
      !taskData.name.trim() ||
      taskData.name.length < 5 ||
      taskData.name.length > 30
    ) {
      setErrorMessage("A tarefa deve ter entre 5 a 30 caracteres.");
      return false;
    } else if (taskData.cost < 0.01) {
      setErrorMessage("O custo minimo da tarefa é de 0,01.");
      return false;
    } else if (!taskData.cost) {
      setErrorMessage("Digite um custo válido.");
      return false;
    } else if (cost.length > 15) {
      setErrorMessage("O custo da tarefa não pode ter mais que 15 digitos.");
      return false;
    } else if (!taskData.limitDate) {
      setErrorMessage("Digite um prazo válido");
      return false;
    } else if (!taskData.limitTime) {
      setErrorMessage("O horário não pode estar vazio.");
      return false;
    }
    return true;
  }

  const submit = async () => {
    const numericCost = cost ? parseFloat(cost.replace(",", ".")) : 0;

    const taskData: TaskData = {
      name,
      cost: numericCost,
      limitDate,
      limitTime,
    };
    if (!validated(taskData)) {
      handleOpenModalError();
    } else {
      try {
        await mutateAsync(taskData);
        closeModal();
      } catch (error) {
        setErrorMessage(error.response.data.error);
        handleOpenModalError();
      }
    }
  };

  return (
    <>
      <div className="card-create-task">
        <div className="card-create-task-top-exit" onClick={closeModal}>
          <ion-icon name="backspace-outline"></ion-icon>
          <p>Fechar</p>
        </div>

        <h1>Criar tarefa</h1>
        <form className="input-container">
          <label>Nome</label>
          <input
            ref={inputRef}
            type="string"
            placeholder="Digite a tarefa"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <label>Custo</label>
          <input
            type="text"
            value={cost}
            onChange={(event) => {
              setCost(event.target.value);
            }}
            required
          />
          <label>Data Limite</label>
          <input
            type="date"
            value={limitDate}
            onChange={(event) => setLimitDate(event.target.value)}
            required
          />
          <label>Horário</label>
          <input
            type="time"
            value={limitTime}
            onChange={(event) => setLimitTime(event.target.value)}
          />
        </form>
        <button onClick={submit} className="btn-create-task-submit">
          Salvar
        </button>
      </div>
      {isCardErrorModalOpen && (
        <CardError closeModal={handleOpenModalError} message={errorMessage} />
      )}
    </>
  );
}
