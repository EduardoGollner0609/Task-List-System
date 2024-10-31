import "./styles.css";

interface TaskProps {
  id: number;
  name: string;
  cost: number;
  limitDate: Date;
}

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function Task({ id, name, cost, limitDate }: TaskProps) {
  const formattedDate: string = formatDate(new Date(limitDate));

  function ShowUpdateModal() {
    const updateModal = document.querySelector(".card-update-task");
    if (updateModal != null) {
      updateModal.classList.add("active-update-task");
    }
  }
  return (
    <div className="card-task">
      <p>ID: {id}</p>
      <p>{name}</p>
      <p>Custo: R${cost.toFixed(2)}</p>
      <p>Data limite: {formattedDate}</p>
      <div className="task-icons-functions">
        <ion-icon name="create-outline" onClick={ShowUpdateModal}></ion-icon>
        <ion-icon name="trash-outline"></ion-icon>
      </div>
    </div>
  );
}
