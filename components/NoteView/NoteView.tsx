import css from "./NoteView.module.css";
import type { Note } from "@/types/note";

type Props = {
  note: Note;
  onBack: () => void;
  backLabel: string;
};

export default function NoteView({ note, onBack, backLabel }: Props) {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2>{note.title}</h2>
        <button onClick={onBack} className={css.button}>
          {backLabel}
        </button>
      </div>
      <p className={css.content}>{note.content}</p>
      <div className={css.footer}>
        <span className={css.tag}>{note.tag}</span>
        <p className={css.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
