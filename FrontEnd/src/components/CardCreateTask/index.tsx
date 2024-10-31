import { useState } from "react";
import "./styles.css";
import { useTaskDataMutate } from "../../hooks/useTaskDataMutate";
import { TaskData } from "../../interface/TaskData";

interface InputProps {
  label: string;
  value: string | number;
  updateValue(value: unknown): void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input
        value={value}
        onChange={(event) => updateValue(event.target.value)}
      ></input>
    </>
  );
};

export default function CardCreateTask() {
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [limitDate, setLimitDate] = useState("");
  const { mutate } = useTaskDataMutate();

  const submit = () => {
    const taskData: TaskData = {
      name,
      cost,
      limitDate: new Date(),
    };
    mutate(taskData);
  };

  return (
    <div className="card-create-task">
      <div className="card-create-task-top-exit">
        <ion-icon name="backspace-outline"></ion-icon>
        <p>Fechar</p>
      </div>

      <h1>Criar tarefa</h1>
      <form className="input-container">
        <Input label="name" value={name} updateValue={setName} />
        <Input label="cost" value={cost} updateValue={setCost} />
        <label>Data Limite</label>
        <input
          type="date"
          value={limitDate}
          onChange={(event) => setLimitDate(event.target.value)}
        />
      </form>
      <button onClick={submit} className="btn-create-task-submit">Salvar</button>
    </div>
  );
}
