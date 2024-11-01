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

const putDataUpTask = async (id: number) => {
  axios.put(`${API_URL}/tasks/${id}/up`);
};

const putDataDownTask = async (id: number) => {
  axios.put(`${API_URL}/tasks/${id}/down`);
};

const deleteData = async (id: number) => {
  axios.delete(`${API_URL}/tasks/${id}`);
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

export function useTaskDataMutatePosition(postionValue: string) {
  const queryClient = useQueryClient();

  const mutationFn = postionValue === "UP" ? putDataUpTask : putDataDownTask;

  const mutate = useMutation({
    mutationFn,
    retry: 2,
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
