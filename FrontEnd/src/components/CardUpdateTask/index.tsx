import { useEffect, useState } from "react";
import "./styles.css";
import { TaskData } from "../../interface/TaskData";
import { useTaskDataMutateUpdate } from "../../hooks/useTaskDataMutate";
import { useTaskDataById } from "../../hooks/useTaskData";

interface CardUpdateTaskProps {
  id: number;
  name: string;
  cost: number;
  limitDate: Date;
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

const formatDateForInput = (date: Date) => {
  date = new Date(date);
  return date.toISOString().split("T")[0];
};

export default function CardUpdateTask(props: CardUpdateTaskProps) {
  const id = props.id;
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [limitDate, setLimitDate] = useState("");
  const { mutate } = useTaskDataMutateUpdate();
  const { data } = useTaskDataById(id);

  useEffect(() => {
      setName(data?.data.name);
      setCost(data?.data.cost);
      setLimitDate(formatDateForInput(data?.data.limitDate));
    }, []);

  const submit = () => {
    const taskData: TaskData = {
      id,
      name,
      cost,
      limitDate: new Date(),
    };

    mutate(taskData);
  };

  return (
    <div className="card-update-task">
      <div className="card-update-task-top-exit" onClick={props.closeModal}>
        <ion-icon name="backspace-outline"></ion-icon>
        <p>Fechar</p>
      </div>

      <h1>Criar tarefa</h1>
      <form className="input-container">
        <Input
          label="name"
          placeHolder="Digite a tarefa"
          value={name}
          updateValue={setName}
        />
        <Input
          label="cost"
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
      </form>
      <button onClick={submit} className="btn-update-task-submit">
        Salvar
      </button>
    </div>
  );
}
