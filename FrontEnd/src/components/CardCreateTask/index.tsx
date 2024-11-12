import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { useTaskDataMutate } from "../../hooks/useTaskDataMutate";
import { TaskData } from "../../interface/TaskData";
import CardError from "../CardError";
import { parseISO } from "date-fns";

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
  const [cost, setCost] = useState();
  const [limitDate, setLimitDate] = useState("");
  const [limitTime, setLimitTime] = useState("");
  const { mutate } = useTaskDataMutate();
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
    const date = parseISO(taskData.limitDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (
      !taskData.name.trim() ||
      taskData.name.length < 5 ||
      taskData.name.length > 30
    ) {
      setErrorMessage("A tarefa deve ter entre 5 a 30 caracteres.");
      return false;
    }
    if (taskData.cost == null || taskData.cost <= 0) {
      setErrorMessage("O custo da tarefa não pode ser 0 ou negativo");
      return false;
    }
    if (!taskData.limitDate || date < today) {
      setErrorMessage("Digite um prazo válido");
      return false;
    }
    if (!taskData.limitTime) {
      setErrorMessage("O horário não pode estar vazio.");
      return false;
    }
    return true;
  }

  const submit = () => {
    const taskData: TaskData = {
      name,
      cost,
      limitDate,
      limitTime,
    };
    if (!validated(taskData)) {
      handleOpenModalError();
    } else {
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
          <label>Nome</label>
          <input
            ref={inputRef}
            type="string"
            placeholder="Digite a tarefa"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
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
