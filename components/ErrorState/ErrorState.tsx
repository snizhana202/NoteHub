"use client";

import css from "./ErrorState.module.css";

interface ErrorStateProps {
  title: string;
  error: Error;
  reset: () => void;
}

export default function ErrorState({ title, error, reset }: ErrorStateProps) {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>{title}</h2>
      <p className={css.message}>{error.message}</p>
      <button className={css.retryButton} onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
