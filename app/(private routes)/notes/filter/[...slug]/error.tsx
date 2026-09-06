"use client";

import ErrorState from "@/components/ErrorState/ErrorState";

export default function NotesError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <ErrorState title="Could not fetch notes." error={error} reset={reset} />
  );
}
