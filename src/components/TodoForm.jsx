import React, { useMemo, useState } from "react";
import { MAX_INPUT_LENGTH } from "../Constant";
import styles from "./TodoForm.module.css";

export default function TodoForm({ setTodoList }) {
  // Hooks
  const [userInput, setUserInput] = useState("");
  const [emptyField, setEmptyField] = useState(false);

  const seg = useMemo(() => {
    return new Intl.Segmenter(undefined, {
      granularity: "grapheme",
    });
  }, []);

  // Helpers
  const charCountInInput = (str, seg) => {
    return [...seg.segment(str)].length;
  };

  // Derived
  const userInputLength = charCountInInput(userInput, seg);
  const isTooLongText = userInputLength > MAX_INPUT_LENGTH;

  // Event handlers
  const addTask = (trimmed) => {
    setTodoList((prev) => {
      const niceText = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      return [niceText, ...prev];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = userInput.trim();

    // Prevent users from submitting only spaces
    if (trimmed.length === 0) {
      setEmptyField(true);
      setTimeout(() => {
        setEmptyField(false);
      },3000);
    } else {
      addTask(trimmed);
    }
    setUserInput("");
  };

  return (
    <div className={styles.form_container}>
      <form
        className={` ${styles.form} ${isTooLongText ? styles.warn_animation : ""}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className={styles.form_layer1}>
          <span className={styles.input_wrapper}>
            <label className={styles.label_task} htmlFor="task">
              enter your task
            </label>
            <input
              id="task"
              type="text"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
              onFocus={() => setEmptyField(false)}
              required
              autoFocus
              className={styles.user_input}
            />
          </span>

          <input
            type="submit"
            title="Click to add"
            value={"+"}
            aria-label="add task"
            className={
              userInputLength ? styles.btn_submit_styled : styles.btn_submit
            }
            disabled={isTooLongText}
          />
        </div>

        <div className={styles.form_layer2}
          style={{ display: emptyField ? "block" : "none" }}
        >
          {/* Empty field warning */}

          <p
            className={styles.warn_container}

          >
            <span className={styles.icon_warn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-exclamation-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
              </svg>
            </span>
            <span className={styles.empty_field_warning_text}>
              please fill out this field{" "}
            </span>
          </p>
        </div>
      </form>

      {/* Too long text warning! */}
      {isTooLongText && (
        <div className={styles.form_warning}>
          {" "}
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 3L2 21H22L12 3Z" fill="#facc15" />
            <path
              d="M12 9V13"
              stroke="#000"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <circle cx={12} cy={17} r={1} fill="#000" />
          </svg>
          <strong>Text is too long</strong>{" "}
        </div>
      )}
    </div>
  );
}
