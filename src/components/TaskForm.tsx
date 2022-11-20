// CSS
import styles from "./TaskForm.module.css";
// Interfaces
import { ITask } from "../interfaces/task";
// React
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

type Props = {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  task?: ITask | null;
  handleUpdate?(id: number, title: string, importance: number): void;
};

function TaskForm({
  btnText,
  taskList,
  setTaskList,
  task,
  handleUpdate,
}: Props) {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [importance, setImportance] = useState<number>(0);

  useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setImportance(task.importance);
    }
  }, [task]);

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleUpdate) {
      handleUpdate(id, title, importance);
    } else {
      const id = Math.floor(Math.random() * 1000);
      const newTask: ITask = { id, title, importance };
      setTaskList!([...taskList, newTask]);
      setTitle("");
      setImportance(0);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setImportance(parseInt(e.target.value));
    }
  };

  return (
    <form className={styles.form} onSubmit={addTaskHandler}>
      <div className={styles.inputContainer}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          name="title"
          placeholder="Nova Tarefa"
          onChange={handleChange}
          value={title}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="importance">Grau de Complexidade:</label>
        <input
          type="text"
          name="importance"
          placeholder="Nova Tarefa"
          onChange={handleChange}
          value={importance}
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );
}

export default TaskForm;
