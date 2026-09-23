import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import type { Note } from "@/types/note";

export function useNote(id: string) {
  return useQuery<Note>({
    queryKey: ["note", id],
    queryFn: async () => {
      const result = await fetchNoteById(id);
      return result;
    },
    refetchOnMount: false,
  });
}
