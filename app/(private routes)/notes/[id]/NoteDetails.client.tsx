"use client";

import { useRouter } from "next/navigation";
import { useNote } from "@/lib/hooks/useNote";
import NoteView from "@/components/NoteView/NoteView";
import NoteStateMessage from "@/components/NoteView/NoteStateMessage";
import css from "./NoteDetails.module.css";

type Props = {
  id: string;
};

export default function NoteDetailsClient({ id }: Props) {
  const router = useRouter();
  const { data, isLoading, error } = useNote(id);

  const handleGoBack = () => {
    const isSure = confirm("Are you sure?");
    if (isSure) {
      router.back();
    }
  };

  if (isLoading) {
    return (
      <main className={css.mainContent}>
        <NoteStateMessage message="Loading, please wait..." />
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className={css.mainContent}>
        <NoteStateMessage message="Something went wrong." />
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
      <NoteView note={data} onBack={handleGoBack} backLabel="Back" />
    </main>
  );
}
