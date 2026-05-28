import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import TodoForm from "../components/TodoForm";
import Modal from "../components/Modal";

export default function HomePage() {
  // UI state
  const [isModalOpen, setModalVisibility] = useState(false);

  // Data state
  const [todoList, setTodoList] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("todo")) ?? [];
      if (!Array.isArray(stored)) throw new Error("Only arrays are allowed!");
      return stored;
    } catch {
      return [];
    }
  });

  const ifListNotEmpty = todoList.length !== 0;

  const deleteItem = (index) => {
    setTodoList((prev) => {
      const new_arr = [...prev];
      new_arr.splice(index, 1);
      return new_arr;
    });
  };

  const clearList = () => {
    setTodoList([]);
    setModalVisibility(false);
  };

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className={styles.home_page_wrapper}>
      {/* Header */}
      <div className={styles.header_container}>
        <div className={styles.header}> TodoList</div>
      </div>

      <TodoForm todoList={todoList} setTodoList={setTodoList} />

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

      {/* Delete all items */}
      {ifListNotEmpty && (
        <div className={styles.btn_clear_list_container}>
          <button
            onClick={() => setModalVisibility(true)}
            className={styles.btn_clear_list}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash3"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
            </svg>
          </button>

          <Modal isOpen={isModalOpen} onClose={() => setModalVisibility(false)}>
            <h3 className={styles.modal_title}>
              Confirmation!
            </h3>
            <hr />
            <div className={styles.modal_clear_list_content}>
              <p>
                Are you sure you want to clear list?
              </p>
              <div className={styles.modal_clear_list_btn_container}>
                <button
                  onClick={() => {
                    setModalVisibility(false);
                  }}
                >
                  no
                </button>
                <button onClick={clearList}>yes</button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}
