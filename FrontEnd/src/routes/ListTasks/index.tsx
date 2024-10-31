import Task from "../../components/Task";
import "./styles.css";

export default function ListTasks() {
  return (
    <main>
      <h1 id="title-home-page">Lista de Tarefas</h1>
      <section className="section-list-tasks">
        <div className="list-tasks">
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <div className="function-add-task">
          <ion-icon name="add-circle-outline"></ion-icon>
          <p>Adicionar nova tarefa</p>
          </div>
        </div>
      </section>
    </main>
  );
}
