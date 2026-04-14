import React, { useMemo, useState } from "react";
import { MAX_INPUT_LENGTH } from "../Constant";
import styles from "./TodoForm.module.css";

export default function TodoForm({ setTodoList }) {
  // Hooks
  const [triggerAnime, setTriggerAnime] = useState(0);
  const [userInput, setUserInput] = useState("");

  const seg = useMemo(() => {
    return new Intl.Segmenter(undefined,{
      granularity: 'grapheme'
    })
  },[])


  
  // Helpers
  const charCountInInput = (str,seg) => {
    return [...seg.segment(str)].length;
  }

  // Derived
  const userInputLength = charCountInInput(userInput,seg);
  const isTooLongText = userInputLength > MAX_INPUT_LENGTH;

  // Event handlers
  const addTask = (trimmed) => {
    setTodoList((prev) => {
      const niceText = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      return [...prev, niceText];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = userInput.trim();

    // Prevent users from submitting only spaces
    if (trimmed.length === 0) {
      setTriggerAnime((prev) => ++prev);
    } else {
      addTask(trimmed);
    }
    setUserInput("");
  };

  return (
    <div className={styles.form_container}>
      {/* Animated warning , when user submit only spaces */}
      {triggerAnime > 0 && (
        <div key={triggerAnime} className={styles.only_spaces}>
          Don't be rude!
        </div>
      )}

      <form
        className={` ${styles.form} ${isTooLongText ? styles.warn_animation : ""}`}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
          placeholder="Enter your task..."
          required
          autoFocus
          className={styles.user_input}
        />

        <input
          type="submit"
          value={"+"}
          className={styles.btn_submit}
          disabled={isTooLongText}
        />
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
