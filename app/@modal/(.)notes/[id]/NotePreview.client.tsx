"use client";

import { useRouter } from "next/navigation";
import { useNote } from "@/lib/hooks/useNote";
import Modal from "@/components/Modal/Modal";
import NoteView from "@/components/NoteView/NoteView";

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();
  const { data, isLoading, error } = useNote(id);

  if (isLoading) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Loading...</p>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Error loading note.</p>
      </Modal>
    );
  }

  if (!data) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Note not found.</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={() => router.back()}>
      <NoteView note={data} onBack={() => router.back()} backLabel="Close" />
    </Modal>
  );
}
