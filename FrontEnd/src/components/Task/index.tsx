import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { useTaskDataMutatePosition } from "../../hooks/useTaskDataMutate";
import CardConfirmRemove from "../CardConfirmRemove";
import CardUpdateTask from "../CardUpdateTask";
import "./styles.css";
import CardError from "../CardError";

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
  const [isCardErrorModalOpen, setIsCardErrorModalOpen] = useState(false);
  const { mutateAsync } = useTaskDataMutatePosition();

  const handleOpenModalUpdate = () => {
    setIsUpdateModalOpen((prev) => !prev);
  };

  const handleOpenModalConfirmRemove = () => {
    setIsConfirmDeleteModalOpen((prev) => !prev);
  };

  const handleOpenModalError = () => {
    setIsCardErrorModalOpen((prev) => !prev);
  };

  const limitDateDisplay = (date: Date) => {
    if (!date || date == null) {
      return "sem prazo";
    } else {
      const brazilianDate = parseISO(String(date));
      return format(brazilianDate, "dd/MM/yyyy", { locale: ptBR });
    }
  };

  const limitTimeDisplay = (time: string) => {
    if (!time || time == null || time == "") {
      return "sem horário";
    } else {
      return time.substring(0, 5);
    }
  };

  const [errorMessage, setErrorMessage] = useState("");

  const costClass =
    cost >= 1000 ? "card-task-cost-bigger" : "card-task-cost-smaller";

  const handleMoveTask = async (taskId: number, direction: "UP" | "DOWN") => {
    try {
     await mutateAsync({ taskId, direction });
    } catch (error) {
      const errorMsg = error.response
        ? error.response.data.error
        : "Erro desconhecido";
      handleOpenModalError();
      setErrorMessage(errorMsg);
    }
  };

  return (
    <>
      <div className={`card-task ${costClass}`}>
        <p>ID: {id}</p>
        <p>Tarefa: {name}</p>
        <p>Custo: R${cost.toFixed(2)}</p>
        <p>Prazo: {limitDateDisplay(limitDate)}</p>
        <p>Horário: {limitTimeDisplay(limitTime)}</p>
        <div className="task-icons-functions">
          <div className="task-icons-functions-top">
            <ion-icon
              name="arrow-up-outline"
              onClick={() => handleMoveTask(id, "UP")}
            ></ion-icon>

            <ion-icon
              name="arrow-down-outline"
              onClick={() => handleMoveTask(id, "DOWN")}
            ></ion-icon>
          </div>
          <div className="task-icons-functions-bottom">
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
      {isCardErrorModalOpen && (
        <CardError closeModal={handleOpenModalError} message={errorMessage} />
      )}
    </>
  );
}
