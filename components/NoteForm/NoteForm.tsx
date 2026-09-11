"use client";

import css from "./NoteForm.module.css";
import { createNote, type CreateNoteData } from "@/lib/api/clientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNoteStore } from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormikContext,
  type FieldProps,
} from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .matches(
      /^[a-zA-Z0-9\s.,!?'"-]+$/,
      "Title may contain English letters only",
    )
    .matches(/[a-zA-Z]/, "Title must contain at least one letter")
    .required("Title is required"),
  content: Yup.string()
    .max(500, "Content must be at most 500 characters")
    .matches(
      /^[a-zA-Z0-9\s.,!?'"-]*$/,
      "Content may contain English letters only",
    ),
  tag: Yup.string().required("Tag is required"),
});

function DraftSync() {
  const { values } = useFormikContext<CreateNoteData>();
  const { setDraft } = useNoteStore();

  useEffect(() => {
    setDraft(values);
  }, [values, setDraft]);

  return null;
}

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: (newNote: CreateNoteData) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
  });

  return (
    <Formik
      initialValues={draft}
      validationSchema={NoteSchema}
      onSubmit={async (values) => {
        await mutation.mutateAsync(values as CreateNoteData);
      }}
    >
      <Form className={css.form}>
        <DraftSync />
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" name="title" type="text" className={css.input} />
          <ErrorMessage
            name="title"
            component="span"
            className={css.fieldError}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field name="content">
            {({ field }: FieldProps) => (
              <textarea
                {...field}
                id="content"
                className={css.textarea}
                rows={3}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = `${target.scrollHeight}px`;
                }}
              />
            )}
          </Field>
          <ErrorMessage
            name="content"
            component="span"
            className={css.fieldError}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage
            name="tag"
            component="span"
            className={css.fieldError}
          />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Create note"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
