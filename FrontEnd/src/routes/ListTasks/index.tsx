import "./styles.css";
import Task from "../../components/Task";
import { useTaskData } from "../../hooks/useTaskData";
import CardCreateTask from "../../components/CardCreateTask";

export default function ListTasks() {
  const { data } = useTaskData();

  return (
    <main>
      <h1 id="title-home-page">Lista de Tarefas</h1>
      <section className="section-list-tasks">
        <CardCreateTask />
        <div className="list-tasks">
          {data?.map((taskData: { id: number; name: string; cost: number; limitDate: Date; }) => (
            <Task
              id={taskData.id}
              name={taskData.name}
              cost={taskData.cost}
              limitDate={taskData.limitDate}
            />
          ))}
          <div className="function-add-task">
            <ion-icon name="add-circle-outline"></ion-icon>
            <p>Adicionar nova tarefa</p>
          </div>
        </div>
      </section>
    </main>
  );
}
