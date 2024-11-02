import { useState } from "react";
import CardUpdateTask from "../CardUpdateTask";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import "./styles.css";
import CardConfirmRemove from "../CardConfirmRemove";
import { useTaskDataMutatePositionDown, useTaskDataMutatePositionUp } from "../../hooks/useTaskDataMutate";

interface TaskProps {
  id: number;
  name: string;
  cost: number;
  limitDate: Date;
  limitTime: string;
}

export default function Task({
  id,
  name,
  cost,
  limitDate,
  limitTime,
}: TaskProps) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const { mutate: upTask } = useTaskDataMutatePositionUp();
  const { mutate: downTask } = useTaskDataMutatePositionDown();


  const handleOpenModalUpdate = () => {
    setIsUpdateModalOpen((prev) => !prev);
  };

  const handleOpenModalConfirmRemove = () => {
    setIsConfirmDeleteModalOpen((prev) => !prev);
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

  const handleUpTask = (taskId: number) => {
    upTask(taskId);
  };

  const handleDownTask = (taskId: number) => {
    downTask(taskId);
  };

  return (
    <>
      <div className={`card-task ${costClass}`}>
        <p>{id}</p>
        <p>{name}</p>
        <p>R${cost.toFixed(2)}</p>
        <p>{limitDateDisplay(limitDate)}</p>
        <p>{limitTimeDisplay(limitTime)}</p>
        <div className="task-icons-functions">
          <ion-icon
            name="arrow-up-outline"
            onClick={() => handleUpTask(id)}
          ></ion-icon>
          <ion-icon name="arrow-down-outline"  onClick={() => handleDownTask(id)}></ion-icon>

          <ion-icon
            name="create-outline"
            onClick={handleOpenModalUpdate}
          ></ion-icon>
          <ion-icon
            name="trash-outline"
            onClick={handleOpenModalConfirmRemove}
          ></ion-icon>
        </div>
      </div>

      {isUpdateModalOpen && (
        <CardUpdateTask
          id={id}
          name={name}
          cost={cost}
          limitDate={limitDate}
          limitTime={limitTime}
          closeModal={handleOpenModalUpdate}
        />
      )}
      {isConfirmDeleteModalOpen && (
        <CardConfirmRemove id={id} closeModal={handleOpenModalConfirmRemove} />
      )}
    </>
  );
}
