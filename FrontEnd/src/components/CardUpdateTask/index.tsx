import "./styles.css";
import { TaskData } from "../../interface/TaskData";
import { useTaskDataMutateUpdate } from "../../hooks/useTaskDataMutate";
import { useEffect, useRef, useState } from "react";
import CardError from "../CardError";
import { parseISO } from "date-fns";

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
  const { mutateAsync } = useTaskDataMutateUpdate();
  const [name, setName] = useState(props.name);
  const [cost, setCost] = useState(props.cost);
  const [limitDate, setLimitDate] = useState(props.limitDate);
  const [limitTime, setLimitTime] = useState(props.limitTime);
  const [isCardErrorModalOpen, setIsCardErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenModalError = () => {
    setIsCardErrorModalOpen((prev) => !prev);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
    if (taskData.cost == null || taskData.cost < 1) {
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

  const submit = async () => {
    const taskData: TaskData = {
      id,
      name,
      cost ,
      limitDate,
      limitTime,
    };
    if (!validated(taskData)) {
      handleOpenModalError();
    } else {
      try {
        await mutateAsync(taskData);
        props.closeModal();
      } catch (error) {
        setErrorMessage(error.response.data.error);
        handleOpenModalError();
      }
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
