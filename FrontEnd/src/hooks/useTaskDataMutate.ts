import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { TaskData } from "../interface/TaskData";

const API_URL = "http://localhost:8080";

const postData = async (data: TaskData) => {
  const response = axios.post(API_URL + "/tasks", data);
  return response;
};

export function useTaskDataMutate() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: postData,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries(['task-data']);
    },
  });

  return mutate;
}
