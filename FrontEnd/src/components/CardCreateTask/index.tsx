import { useState } from "react";
import "./styles.css";
import { useTaskDataMutate } from "../../hooks/useTaskDataMutate";
import { TaskData } from "../../interface/TaskData";
import CardError from "../CardError";

interface InputProps {
  label: string;
  value: string | number;
  placeHolder: string;
  updateValue(value: unknown): void;
}

interface CardCreateTaskProps {
  closeModal(): void;
}

const Input = ({ label, value, placeHolder, updateValue }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input
        value={value}
        placeholder={placeHolder}
        onChange={(event) => updateValue(event.target.value)}
      ></input>
    </>
  );
};

export default function CardCreateTask({ closeModal }: CardCreateTaskProps) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [limitDate, setLimitDate] = useState("");
  const [limitTime, setLimitTime] = useState("");
  const { mutate } = useTaskDataMutate();
  const [isCardErrorModalOpen, setIsCardErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpenModalError = () => {
    setIsCardErrorModalOpen((prev) => !prev);
  };

  function validatedName(name: string) {
    if (!name.trim() || name.length < 5) {
      return false;
    }
    return true;
  }

  const submit = () => {
    if (validatedName(name) == false) {
      setErrorMessage("A tarefa deve ter pelo menos 5 caracteres.");
      handleOpenModalError();
    } else {
      const taskData: TaskData = {
        name,
        cost,
        limitDate,
        limitTime,
      };
      mutate(taskData);
      closeModal();
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
          <Input
            label="Nome"
            placeHolder="Digite a tarefa"
            value={name}
            updateValue={setName}
          />
          <Input
            label="Custo"
            placeHolder="Digite o custo"
            value={cost}
            updateValue={setCost}
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
