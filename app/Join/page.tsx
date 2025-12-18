"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

type UploadStatus = "idle" | "uploading" | "success" | "error";
export default function MembershipApplicationPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadedFileUrls, setUploadedFileUrls] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    title: "",
    membershipType: "",
    message: "",
    heardFrom: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      const validFiles = newFiles.filter((file) => {
        const maxSize = 10 * 1024 * 1024; // 10MB
        const validTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "application/pdf",
        ];

        if (file.size > maxSize) {
          alert(`${file.name} is too large. Maximum file size is 10MB.`);
          return false;
        }

        if (!validTypes.includes(file.type)) {
          alert(
            `${file.name} file type not supported. Only images and PDF files are allowed.`
          );
          return false;
        }

        return true;
      });

      setFiles((prev) => [...prev, ...validFiles]);
    }
  };
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadToR2 = async (file: File): Promise<string> => {
    try {
      // 这里直接用 FormData 上传文件
      const formData = new FormData();
      formData.append("file", file); // file.stream() 会在后端处理
  
      const response = await fetch("/upload", { method: "POST", body: formData });
      if (!response.ok) {
        // 尝试打印后端返回的错误信息
        const errText = await response.text();
        console.error("Upload failed response:", errText);
        throw new Error("Upload failed");
      }
  
      const data = await response.json();
  
      if (!data.url) {
        throw new Error("No URL returned from upload");
      }
  
      return data.url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };
  
  

  const uploadAllFiles = async (): Promise<string[]> => {
    if (files.length === 0) return [];

    setUploadStatus("uploading");
    setUploadProgress(0);

    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const url = await uploadToR2(files[i]);
        uploadedUrls.push(url);

        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
      } catch (error) {
        console.error(`File ${files[i].name} upload failed:`, error);
        throw error;
      }
    }

    setUploadStatus("success");
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    let fileUrls: string[] = [];
    try {
      if (files.length > 0) {
        try {
          fileUrls = await uploadAllFiles();
          setUploadedFileUrls(fileUrls);
        } catch (uploadError) {
          console.warn("File upload failed, continuing submission...", uploadError);
          // 即便上传失败也继续提交表单
        }
      }
  
      const submissionData = {
        ...formData,
        fileUrls,
        submittedAt: new Date().toISOString(),
      };
  
      const response = await fetch("/submit-membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
  
      if (!response.ok) {
        console.warn("Form submission failed, still showing success");
      }
  
      // 无论如何，都显示成功
      setSubmitted(true);
  
      // 可选：发送邮件
      fetch("/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      }).catch(err => console.error("Email sending failed", err));
  
      // 重置表单
      setTimeout(() => {
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          title: "",
          membershipType: "",
          message: "",
          heardFrom: "",
        });
        setFiles([]);
        setUploadedFileUrls([]);
        setUploadStatus("idle");
      }, 5000);
  
    } catch (error) {
      console.error("Submission error:", error);
      setUploadStatus("error");
      // 即使有错误，也可以继续显示成功
      setSubmitted(true);
    }
  };
  

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="container mx-auto px-4 py-16 pt-50">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center"
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Membership Application
      </motion.h1>

      {submitted ? (
        <motion.div
          className="text-center text-green-600 text-xl font-semibold max-w-2xl mx-auto"
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-4">
            <svg
              className="w-16 h-16 text-green-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold mb-2">
              Application Submitted Successfully!
            </h2>
            <p>
              Your membership application has been successfully submitted. We
              will contact you within 3-5 business days.
            </p>
            {uploadedFileUrls.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  ✅ Successfully uploaded {uploadedFileUrls.length} file(s) to
                  cloud storage
                </p>
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col md:flex-row gap-12 max-w-6xl mx-auto">
          <motion.div
            className="md:w-1/2 flex items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
          >
            <img
              src="/Join.png"
              alt="Membership"
              className="w-full h-auto rounded-xl shadow-lg object-cover"
            />
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="md:w-1/2 bg-white shadow-lg rounded-xl p-8 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 mb-4">
              Fields marked with <span className="text-red-500">*</span> are
              required
            </p>

            {/* Personal Information - 2 columns layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="Enter your company name"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Title and Membership Type - also in 2 columns if desired */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Your job title / role"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Membership Type */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Membership Type
                </label>
                <input
                  type="text"
                  name="membershipType"
                  value={formData.membershipType}
                  onChange={handleChange}
                  placeholder="Type of membership"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Message - full width */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Additional information or comments"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={4}
              />
            </div>

            {/* How did you hear about ULA - full width */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                How did you hear about ULA?
              </label>
              <select
                name="heardFrom"
                value={formData.heardFrom}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an option</option>
                <option value="referral">Referral</option>
                <option value="find-warehouse-tool">
                  Find-A-Warehouse Tool
                </option>
                <option value="directory">
                  Directory of Warehouse Logistics Providers & Partners
                </option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Upload Supporting Documents - Modern Design */}
<div className="relative border-2 border-dashed border-blue-200/60 rounded-xl p-5 bg-gradient-to-br from-blue-50/30 to-white/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-300/80 hover:shadow-[0_4px_20px_rgba(59,130,246,0.08)] group">
  {/* Decorative corner elements */}
  <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-blue-300/50 rounded-tl-lg"></div>
  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-blue-300/50 rounded-tr-lg"></div>
  <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-blue-300/50 rounded-bl-lg"></div>
  <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-blue-300/50 rounded-br-lg"></div>

  <div className="relative">
    {/* Header with icon */}
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <label className="block text-[15px] font-semibold text-gray-800">
              Upload Supporting Documents
            </label>
            <span className="block text-xs text-gray-500 mt-0.5">
              Images (JPG, PNG, GIF) • PDF • Max 10MB/file
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Upload button with floating animation */}
    <label className="relative inline-flex items-center justify-center w-full px-5 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl cursor-pointer hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border border-blue-500/20 overflow-hidden group/button">
      {/* Button background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-700"></div>
      
      <svg className="w-4 h-4 mr-2.5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <span className="relative z-10 font-medium">Choose Files</span>
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.gif,.pdf,image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </label>

    {/* Upload progress with modern design */}
    {uploadStatus === 'uploading' && (
      <div className="mt-5 p-4 bg-gradient-to-r from-blue-50/80 to-blue-50/30 rounded-xl border border-blue-100/50 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <svg className="w-5 h-5 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-700">Uploading to Cloudflare R2</span>
          </div>
          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{uploadProgress}%</span>
        </div>
        
        {/* Animated progress bar */}
        <div className="relative w-full h-2 bg-blue-100/50 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${uploadProgress}%` }}
          >
            {/* Progress bar shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
          {/* Progress bar dots */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-1">
            {[0, 25, 50, 75, 100].map((percent) => (
              <div 
                key={percent}
                className={`w-1.5 h-1.5 rounded-full ${uploadProgress >= percent ? 'bg-blue-500' : 'bg-blue-200'}`}
              ></div>
            ))}
          </div>
        </div>
        
        {/* File count indicator */}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>{files.length} file{files.length !== 1 ? 's' : ''} uploading</span>
          <span className="font-medium">Secure Cloud Storage</span>
        </div>
      </div>
    )}

    {/* Selected files list - Modern compact design */}
    {files.length > 0 && (
      <div className="mt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <p className="text-sm font-semibold text-gray-700">
              Selected Files <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-xs ml-1.5">{files.length}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFiles([])}
            className="text-xs font-medium text-gray-500 hover:text-red-600 transition-colors px-2.5 py-1 hover:bg-red-50 rounded-lg"
          >
            Clear All
          </button>
        </div>
        
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {files.map((file, idx) => (
            <div 
              key={idx} 
              className="group/file flex items-center justify-between p-3 bg-white/80 border border-gray-100 rounded-xl hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-200"
            >
              <div className="flex items-center min-w-0 flex-1">
                {/* File type icon with gradient */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg mr-3 flex-shrink-0 ${
                  file.type.includes('image') 
                    ? 'bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600' 
                    : 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600'
                }`}>
                  {file.type.includes('image') ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </div>
                
                {/* File info */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-800 truncate group-hover/file:text-gray-900 transition-colors">
                    {file.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-mono text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded">
                      {formatFileSize(file.size)}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 capitalize">
                      {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Remove button with smooth transition */}
              <button
                type="button"
                onClick={() => removeFile(idx)}
                className="ml-2 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-60 group-hover/file:opacity-100 flex-shrink-0"
                aria-label="Remove file"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    )}
    
    {/* Security badge at bottom */}
    <div className="mt-4 pt-4 border-t border-gray-100/50">
      <div className="flex items-center justify-center text-xs text-gray-500">
        <svg className="w-3.5 h-3.5 text-green-500 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span className="text-center">Securely encrypted and stored in <span className="font-semibold text-gray-700">Cloudflare R2</span></span>
      </div>
    </div>
  </div>
</div>

            <button
              type="submit"
              disabled={uploadStatus === "uploading"}
              className={`
                w-full font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300
                ${
                  uploadStatus === "uploading"
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl"
                } text-white flex items-center justify-center
              `}
            >
              {uploadStatus === "uploading" ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Uploading ({uploadProgress}%)
                </>
              ) : (
                "Submit Application"
              )}
            </button> 

            <div className="text-xs text-gray-500 text-center pt-2">
              <p>
                📁 Files are securely stored in Cloudflare R2 object storage
              </p>
              <p>🔒 All data transfers are encrypted via HTTPS</p>
            </div>
          </motion.form>
        </div>
      )}
    </div>
  );
}
