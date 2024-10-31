import { useQuery } from 'react-query';
import axios from 'axios';

const API_URL = "http://localhost:8080";

const fetchData = async () => {
    const response = axios.get(API_URL + "/tasks");
    return response;
}

export function useTaskData() {
    const query = useQuery({
        queryFn: fetchData, 
        queryKey: ['task-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}