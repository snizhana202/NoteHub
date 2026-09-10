"use client";

import { useRouter } from "next/navigation";
import { useNote } from "@/lib/hooks/useNote";
import Modal from "@/components/Modal/Modal";
import NoteView from "@/components/NoteView/NoteView";
import NoteStateMessage from "@/components/NoteView/NoteStateMessage";
import Loading from "@/components/Loading/Loading";

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();
  const { data, isLoading, error } = useNote(id);

  if (isLoading) {
    return (
      <Modal onClose={() => router.back()}>
        <Loading />
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal onClose={() => router.back()}>
        <NoteStateMessage message="Error loading note." />
      </Modal>
    );
  }

  if (!data) {
    return (
      <Modal onClose={() => router.back()}>
        <NoteStateMessage message="Note not found." />
      </Modal>
    );
  }

  return (
    <Modal onClose={() => router.back()}>
      <NoteView note={data} onBack={() => router.back()} backLabel="Close" />
    </Modal>
  );
}
