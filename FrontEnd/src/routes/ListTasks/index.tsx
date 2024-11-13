import "./styles.css";
import Task from "../../components/Task";
import { useTaskData } from "../../hooks/useTaskData";
import { useState } from "react";
import CardCreateTask from "../../components/CardCreateTask";

export default function ListTasks() {
  const { data } = useTaskData();
  const [isCreateModalOpen, setIsCreateModal] = useState(false);

  const handleOpenModalCreate = () => {
    setIsCreateModal((prev) => !prev);
  };

  return (
    <main>
      <div className="top-list-tasks">
        <h1 id="title-list-tasks">Lista de Tarefas</h1>
      </div>
      <section className="section-list-tasks">
        <div className="list-tasks">
          {data?.map(
            (taskData: {
              id: number;
              name: string;
              cost: number;
              limitDate: string;
            }) => (
              <Task
                id={taskData.id}
                name={taskData.name}
                cost={taskData.cost}
                limitDate={taskData.limitDate}
              />
            )
          )}
          <div className="function-add-task" onClick={handleOpenModalCreate}>
            <ion-icon name="add-circle-outline"></ion-icon>
            <p>Adicionar nova tarefa</p>
          </div>
        </div>
      </section>
      {isCreateModalOpen && (
        <CardCreateTask closeModal={handleOpenModalCreate} />
      )}
    </main>
  );
}
