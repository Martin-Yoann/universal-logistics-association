"use client";

import { useState } from "react";

export default function UploadPage() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("text", text);
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setResult(`Upload success! ${JSON.stringify(data)}`);
    } catch (err: any) {
      setResult(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Simple Upload</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <br />
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <br />
        <button type="submit" style={{ marginTop: 10 }}>
          Upload
        </button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
}
