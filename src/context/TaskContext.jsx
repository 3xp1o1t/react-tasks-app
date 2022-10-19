import { createContext, useState, useEffect } from "react";
import { tasks as data } from "../data/tasks";

// Creamos un contexto que compartira los datos con el resto de componentes
export const TaskContext = createContext();

// Creamos el componente que proveera del estado a los componentes hijos.
// Por regla es normal usar Provider.
export function TaskContextProvider(props) {
  const [tasks, setTasks] = useState([]);

  // Solo se ejecuta al iniciar la apliacion
  useEffect(() => {
    setTasks(data);
  }, []);

  function createTask(task) {
    setTasks([
      ...tasks,
      {
        title: task.title,
        id: tasks.length,
        description: task.description,
      },
    ]);
  }

  function deleteTask(taskID) {
    // Filter: Guardar los elementos que retornen TRUE de la condicion !==
    // en caso contrario, los ignora.
    setTasks(tasks.filter((task) => task.id !== taskID));
  }
  return (
    <TaskContext.Provider
      value={{
        tasks,
        deleteTask,
        createTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}
