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
}

export default function Task({ id, name, cost, limitDate }: TaskProps) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const date = parseISO(String(limitDate));
  const formattedDate = format(date, "dd/MM/yyyy", { locale: ptBR });

  const handleOpenModalUpdate = () => {
    setIsUpdateModalOpen((prev) => !prev);
  };

  return (
    <>
      <div className="card-task">
        <p>ID: {id}</p>
        <p>{name}</p>
        <p>Custo: R${cost.toFixed(2)}</p>
        <p>Data limite: {formattedDate}</p>
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
