"use client";

import ErrorState from "@/components/ErrorState/ErrorState";

export default function NoteDetailsError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Could not fetch note details."
      error={error}
      reset={reset}
    />
  );
}
