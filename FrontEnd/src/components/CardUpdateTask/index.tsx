import { useEffect, useState } from "react";
import "./styles.css";
import { useTaskDataMutate } from "../../hooks/useTaskDataMutate";
import { TaskData } from "../../interface/TaskData";
import axios from "axios";

interface TaskProps {
  id: number;
  name: string;
  cost: number;
  limitDate: Date;
}

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

const formatDateForInput = (date: Date) => {
  date = new Date(date);
  return date.toISOString().split("T")[0]; 
};

export default function CardUpdateTask(task: TaskProps) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [limitDate, setLimitDate] = useState("");
  const { mutate } = useTaskDataMutate("PUT");

  useEffect(() => {
    axios.get(`http://localhost:8080/tasks/${task.id}`).then((response) => {
      setName(response.data.name);
      setCost(response.data.cost);
      setLimitDate(formatDateForInput(response.data.limitDate));
    });
  }, []);

  const submit = () => {
    const taskData: TaskData = {
      name,
      cost,
      limitDate: new Date(),
    };
    mutate(taskData);
  };

  function closeModalCreate() {
    const cardCreateTask = document.querySelector(".card-update-task");

    if (cardCreateTask != null) {
      cardCreateTask.classList.remove("active-update-task");
    }
  }

  return (
    <div className="card-update-task">
      <div className="card-update-task-top-exit" onClick={closeModalCreate}>
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
      <button onClick={submit} className="btn-create-task-submit">
        Salvar
      </button>
    </div>
  );
}
