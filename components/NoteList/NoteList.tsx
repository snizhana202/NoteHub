import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api/clientApi";
import Link from "next/link";
import { Note } from "@/types/note";
import { useState } from "react";
import Modal from "@/components/Modal/Modal";

export interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setNoteToDelete(null);
    },
  });

  if (notes.length === 0) return null;

  return (
    <>
      <ul className={css.list}>
        {notes.map((note) => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>
              <button
                className={css.button}
                onClick={() => setNoteToDelete(note)}
                disabled={mutation.isPending}
              >
                {mutation.isPending && mutation.variables === note.id
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {noteToDelete && (
        <Modal onClose={() => setNoteToDelete(null)}>
          <p>{`Delete "${noteToDelete.title}"? This can't be undone.`}</p>
          <button onClick={() => setNoteToDelete(null)}>Cancel</button>
          <button
            className={css.button}
            onClick={() => mutation.mutate(noteToDelete.id)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </Modal>
      )}
    </>
  );
}
