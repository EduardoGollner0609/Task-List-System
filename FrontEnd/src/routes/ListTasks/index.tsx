import Task from '../../components/Task';
import './styles.css';

export default function ListTasks() {
    return (
   <main>
    <h1 id="title-home-page">Lista de Tarefas</h1>
    <section className="section-list-tasks">
<div className="list-tasks">
<Task />
</div>
    </section>
   </main>
    );
}