import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { TaskData } from "../interface/TaskData";

const API_URL = "http://localhost:8080";

const postData = async (data: TaskData) => {
  const response = axios.post(API_URL + "/tasks", data);
  return response;
};

const putData = async (data: TaskData) => {
  const response = axios.put(`${API_URL}/tasks/${data.id}`, data);
  return response;
};

const putDataUpTask = async (taskId: number) => {
  await axios.put(`${API_URL}/tasks/${taskId}/up`);
};

const putDataDownTask = async (taskId: number) => {
 await axios.put(`${API_URL}/tasks/${taskId}/down`);
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

export function useTaskDataMutatePositionUp() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: putDataUpTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["task-data"]);
    },
  });

  return mutate;
}

export function useTaskDataMutatePositionDown() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: putDataDownTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["task-data"]);
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
