import { useQuery } from "react-query";
import axios from "axios";

const API_URL = "http://localhost:8080";

const fetchData = async () => {
  const response = axios.get(API_URL + "/tasks");
  return response;
};

const fetchDataById = async (id: number) => {
  const response = axios.get(`${API_URL}/tasks/${id}`);
  return response;
};

export function useTaskData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["task-data"],
    retry: 2,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

export function useTaskDataById(id: number) {
  const query = useQuery({
    queryFn: () => fetchDataById(id), 
    queryKey: ["task-data", id], 
    retry: 2,
    enabled: !!id, 
  });

  return {
    ...query,
    data: query.data, 
  };
}
