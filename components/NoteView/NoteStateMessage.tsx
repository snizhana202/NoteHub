import css from "./NoteView.module.css";

type Props = {
  message: string;
};

export default function NoteStateMessage({ message }: Props) {
  return <p className={css.stateMessage}>{message}</p>;
}
