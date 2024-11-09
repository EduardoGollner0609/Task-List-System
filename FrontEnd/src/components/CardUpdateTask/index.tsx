import "./styles.css";
import { TaskData } from "../../interface/TaskData";
import { useTaskDataMutateUpdate } from "../../hooks/useTaskDataMutate";
import { useState } from "react";
import CardError from "../CardError";

interface CardUpdateTaskProps {
  id: number;
  name: string;
  cost: number;
  limitDate: string;
  limitTime: string;
  closeModal(): void;
}

interface InputProps {
  label: string;
  value: string | number;
  placeHolder: string;
  updateValue(value: unknown): void;
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

export default function CardUpdateTask(props: CardUpdateTaskProps) {
  const id = props.id;
  const { mutate } = useTaskDataMutateUpdate();
  const [name, setName] = useState(props.name);
  const [cost, setCost] = useState(props.cost);
  const [limitDate, setLimitDate] = useState(props.limitDate);
  const [limitTime, setLimitTime] = useState(props.limitTime);
  const [isCardErrorModalOpen, setIsCardErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function validatedName(name: string) {
    if (!name.trim() || name.length < 5 || name.length > 30) {
      return false;
    }
    return true;
  }

  const handleOpenModalError = () => {
    setIsCardErrorModalOpen((prev) => !prev);
  };

  const submit = () => {
    if (validatedName(name) == false) {
      setErrorMessage("A tarefa deve ter entre 5 a 50 caracteres.");
      handleOpenModalError();
    } else {
      const taskData: TaskData = {
        id,
        name,
        cost,
        limitDate,
        limitTime,
      };

      mutate(taskData);
      props.closeModal();
    }
  };

  return (
    <>
      <div className="card-update-task">
        <div className="card-update-task-top-exit" onClick={props.closeModal}>
          <ion-icon name="backspace-outline"></ion-icon>
          <p>Fechar</p>
        </div>

        <h1>Atualizar tarefa</h1>
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
          />
          <label>Horario</label>
          <input
            type="time"
            value={limitTime}
            onChange={(event) => setLimitTime(event.target.value)}
          />
        </form>
        <button onClick={submit} className="btn-update-task-submit">
          Salvar
        </button>
      </div>
      {isCardErrorModalOpen && (
        <CardError closeModal={handleOpenModalError} message={errorMessage} />
      )}
    </>
  );
}
