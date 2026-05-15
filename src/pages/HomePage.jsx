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

  // Event handlers
  const deleteItem = (index) => {
    setTodoList((prev) => {
      const new_arr = [...prev];
      new_arr.splice(index, 1);
      return new_arr;
    });
  };

  return (
    <div className={styles.home_page_wrapper}>
      {/* Header */}
      <div className={styles.header_container}>
        <h1 className={styles.header}> TodoList</h1>
      </div>

      <TodoForm setTodoList={setTodoList} />

      {/* Body */}

      {/* Displayer */}
      <div className={`${styles.hvc}`}>
        <ol className={styles.list_item_container}>
          {todoList.map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                overflow: "hidden",
                margin: "5px",
              }}
            >
              <span className={styles.todo_item_sno}>
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <div className={styles.list_item}>
                {" "}
                {item}{" "}
                <button
                  className={`${styles.btn_delete}`}
                  onClick={() => deleteItem(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
