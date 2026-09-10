"use client";

import css from "@/components/EditProfilePage/EditProfilePage.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";
import { FiUser, FiCamera } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import Loading from "@/components/Loading/Loading";

export default function EditProfile() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [username, setUsername] = useState(user?.username ?? "");
  const [previewUrl, setPreviewUrl] = useState<string>(
    user?.avatar && !user.avatar.includes("default-avatar") ? user.avatar : "",
  );
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      if (file) {
        formData.append("avatar", file);
      }

      const updatedUser = await updateMe(formData);
      setUser(updatedUser);
      router.push("/profile");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only images allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Max file size 5MB");
      return;
    }

    setFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.avatarWrapper}>
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          ) : (
            <div className={css.avatarPlaceholder}>
              <FiUser size={60} />
            </div>
          )}
          <label className={css.choosePhoto}>
            <FiCamera size={18} />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={css.avatarInput}
            />
          </label>

          {previewUrl && (
            <button
              type="button"
              className={css.removePhoto}
              onClick={() => {
                setFile(null);
                setPreviewUrl("");
              }}
            >
              <MdOutlineClose size={22} />
            </button>
          )}
        </div>

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <h1 className={css.formTitle}>Edit Profile</h1>

          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
