import { useState } from "react";
import CardUpdateTask from "../CardUpdateTask";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import "./styles.css";

interface TaskProps {
  id: number;
  name: string;
  cost: number;
  limitDate: Date;
  limitTime: string;
}

function checkCost(cost: number) {
  const cardTask = document.querySelector(".card-task");
  if (cost >= 1000.0) {
    cardTask?.classList.add("card-cost-bigger-and-1000");
  }
}

export default function Task({
  id,
  name,
  cost,
  limitDate,
  limitTime,
}: TaskProps) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  console.log(limitTime);

  const handleOpenModalUpdate = () => {
    setIsUpdateModalOpen((prev) => !prev);
  };

  const limitDateDisplay = (date: Date) => {
    if (!date || date == null) {
      return "sem prazo estimada";
    } else {
      const brazilianDate = parseISO(String(date));
      return format(brazilianDate, "dd/MM/yyyy", { locale: ptBR });
    }
  };

  const limitTimeDisplay = (time: string) => {
    if (!time || time == null || time == "") {
      return "sem horário estimado";
    } else {
      return time.substring(0, 5);
    }
  };

  const costClass =
    cost >= 1000 ? "card-task-cost-bigger" : "card-task-cost-smaller";

  return (
    <>
      <div className={`card-task ${costClass}`}>
        <p>ID: {id}</p>
        <p>{name}</p>
        <p>Custo: R${cost.toFixed(2)}</p>
        <p>Data limite: {limitDateDisplay(limitDate)}</p>
        <p>Horario: {limitTimeDisplay(limitTime)}</p>
        <div className="task-icons-functions">
          <ion-icon
            name="create-outline"
            onClick={handleOpenModalUpdate}
          ></ion-icon>
          <ion-icon name="trash-outline"></ion-icon>
        </div>
      </div>
      {isUpdateModalOpen && (
        <CardUpdateTask
          id={id}
          name={name}
          cost={cost}
          limitDate={limitDate}
          closeModal={handleOpenModalUpdate}
        />
      )}
    </>
  );
}
