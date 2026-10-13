"use client";

import { useRouter } from "next/navigation";
import { useNote } from "@/lib/hooks/useNote";
import NoteView from "@/components/NoteView/NoteView";
import NoteStateMessage from "@/components/NoteView/NoteStateMessage";
import css from "./NoteDetails.module.css";
import Loading from "@/components/Loading/Loading";

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
      <div className={css.mainContent}>
        <Loading />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={css.mainContent}>
        <NoteStateMessage message="Something went wrong." />
      </div>
    );
  }

  return (
    <div className={css.mainContent}>
      <NoteView note={data} onBack={handleGoBack} backLabel="Back" />
    </div>
  );
}
