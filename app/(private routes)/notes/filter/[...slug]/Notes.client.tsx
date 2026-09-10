"use client";

import css from "@/components/NotePages/NotePages.module.css";
import NoteList from "@/components/NoteList/NoteList";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";
import Loading from "@/components/Loading/Loading";

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [searchText, setSearchText] = useState("");

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchText(value);
    setPage(1);
  }, 1000);

  useEffect(() => {
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", tag, page, searchText],
    queryFn: () => fetchNotes(page, 12, tag, searchText),
    placeholderData: (prevData) => prevData,
  });

  const totalPages = data ? data.totalPages : 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={setInputValue} />
        {data && totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>

      {isLoading && <Loading />}
      {error && <p>Error loading notes</p>}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
