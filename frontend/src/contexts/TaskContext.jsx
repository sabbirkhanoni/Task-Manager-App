import React, { createContext, useContext, useState } from "react";
import axios from "axios";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  
  const fetchAllTasks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tasks`,
        { withCredentials: true },
      );
      if (response.data.error) {
        console.error("Error fetching tasks:", response.data.message);
        return [];
      }
      if (response.data.success) {
        setTasks(response.data.data);
        return response.data.data;
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  }

  return (
    <TaskContext.Provider value={{ fetchAllTasks, tasks , setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
