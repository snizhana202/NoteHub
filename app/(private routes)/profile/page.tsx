import css from "@/components/EditProfilePage/EditProfilePage.module.css";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getMeServer } from "@/lib/api/serverApi";
import { FiUser } from "react-icons/fi";

export const metadata: Metadata = {
  title: "User Profile",
  description: "Profile page with user information and avatar",
  openGraph: {
    title: "User Profile",
    description: "Profile page with user information and avatar",
    url: "https://notehub-snizhana202s-projects.vercel.app/profile",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "User Profile",
    description: "Profile page with user information and avatar",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default async function Profile() {
  const user = await getMeServer();
  const isDefaultAvatar =
    !user.avatar || user.avatar.includes("default-avatar");

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.avatarWrapper}>
          {!isDefaultAvatar ? (
            <Image
              src={user.avatar}
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
        </div>

        <div className={css.profileInfo}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <div className={css.userInfo}>
            <p>
              <span className={css.label}>Username</span>
              {user.username}
            </p>
            <p>
              <span className={css.label}>Email</span>
              {user.email}
            </p>
          </div>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
      </div>
    </main>
  );
}
