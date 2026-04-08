import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import TodoForm from "../components/TodoForm";

export default function HomePage() {
  // States
  const [todoList, setTodoList] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("todo")) ?? [];
      if (!Array.isArray(stored)) throw new Error("Only arrays are allowed!");
      return stored;
    } catch {
      return [];
    }
  });

  // useEffects
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoList));
  }, [todoList]);

  // JSX
  return (
    <div className={styles.home_page_wrapper}>
      {/* Header */}
      <div className={styles.header_container}>
        <h1 className={styles.header}> TodoList</h1>
      </div>

      {/* Body */}
      <TodoForm setTodoList={setTodoList} />
    </div>
  );
}
