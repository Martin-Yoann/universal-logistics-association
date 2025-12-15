"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type UserProfile = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  bio?: string;
  website?: string;
  location?: string;
  avatar?: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  // 🔐 检查“是否登录”
  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      router.push("/");
      return;
    }

    fetch(`/api/user/get-profile?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.user);
        setAvatarPreview(data.user?.avatar || "");
        setLoading(false);
      })
      .catch(() => {
        router.push("/");
      });
  }, [router]);

  // 头像预览
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  // 保存资料
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      // 上传头像
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const uploadRes = await fetch("/api/user/upload-avatar", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (uploadData.success) {
          profile.avatar = uploadData.url;
        }
      }

      // 更新资料
      await fetch("/api/user/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (err) {
      alert("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-20">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
            {avatarPreview ? (
              <img src={avatarPreview} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold">
                {profile.name.charAt(0)}
              </div>
            )}
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="w-full border p-2 rounded"
              placeholder="Name"
            />

            <input
              value={profile.email}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />

            <textarea
              value={profile.bio}
              onChange={(e) =>
                setProfile({ ...profile, bio: e.target.value })
              }
              className="w-full border p-2 rounded"
              placeholder="Bio"
            />

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-2">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Bio:</strong> {profile.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}
