import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { TaskData } from "../interface/TaskData";


const API_URL = "http://localhost:8080";

const postData = async (data: TaskData) => {
  const response = axios.post(API_URL + "/tasks", data);
  return response;
};

const putData = async (data: TaskData) => {
  const response = axios.put(API_URL + "/tasks", data);
  return response;
};

export function useTaskDataMutate(methodValue : string) {
  const queryClient = useQueryClient();

  const mutationFn = methodValue === "PUT" ? putData : postData;

  const mutate = useMutation({
    mutationFn,
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries(["task-data"]);
    },
    onError: (error) => {
      console.error("Error during mutation:", error);
    },
  });

  return mutate;
}
