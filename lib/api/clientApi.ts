import type { AxiosResponse } from "axios";
import type { Note, NoteTag } from "../../types/note";
import type { RegisterRequest, LoginRequest } from "@/types/auth";
import type { User } from "@/types/user";
import api from "./api";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface FetchNoteResponse {
  note: Note;
}

// --- Notes ---

export async function fetchNotes(
  page: number,
  perPage?: number,
  tag?: string,
  search?: string,
): Promise<FetchNotesResponse> {
  const params: Record<string, unknown> = {
    page,
    perPage,
    search,
    ...(tag && tag !== "all" && { tag }),
  };
  const response: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params,
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await api.get(`/notes/${id}`);
  return response.data;
}

export async function createNote(data: CreateNoteData): Promise<Note> {
  const response: AxiosResponse<Note> = await api.post("/notes", data);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
}

// --- Auth ---

export const register = async (data: RegisterRequest) => {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const checkSession = async () => {
  try {
    await api.post("/auth/refresh");
    return true;
  } catch {
    return false;
  }
};

export const getMe = async () => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const updateUsername = async (username: string) => {
  const { data } = await api.patch<User>("/users/me", { username });
  return data;
};

export const updateAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);
  const { data } = await api.patch<{ url: string }>(
    "/users/me/avatar",
    formData,
  );
  return data;
};
