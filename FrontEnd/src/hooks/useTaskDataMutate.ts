import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { TaskData } from "../interface/TaskData";
import { BASE_URL } from "../utils/system";

const API_URL = BASE_URL;

type MoveTaskParams = {
  taskId: number;
  direction: "UP" | "DOWN";
};

const postData = async (data: TaskData) => {
  const response = axios.post(API_URL + "/tasks", data);
  return response;
};

const putData = async (data: TaskData) => {
  const response = axios.put(`${API_URL}/tasks/${data.id}`, data);
  return response;
};

const putDataTask = async ({ taskId, direction }: MoveTaskParams) => {
  const endpoint =
    direction === "UP" ? `${API_URL}/tasks/${taskId}/up` : `${API_URL}/tasks/${taskId}/down`;
  await axios.put(endpoint);
};

const deleteData = async (id: number) => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};

export function useTaskDataMutateUpdate() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: putData,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries(["task-data"]);
    },
    onError: () => {
      alert("Ele já está no limite.");
    }
  });

  return mutate;
}

export function useTaskMutateDelete() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: deleteData,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries(["task-data"]);
    },
  });

  return mutate;
}

export function useTaskDataMutatePosition() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: putDataTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["task-data"]);
    },onError: (error) => {
      throw error;
    },
  });

  return mutate;
}

export function useTaskDataMutate() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: postData,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries(["task-data"]);
    },
  });

  return mutate;
}
