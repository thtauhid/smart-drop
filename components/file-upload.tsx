"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DOMAIN_NAME } from "@/constants";
import { cn } from "@/lib/utils";
import { Check, Copy, File, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setUploadComplete(false);
      setShareLink("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024, // 100MB max size
  });

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 200);

    // In a real implementation, you would:
    // 1. Call your API to get a pre-signed S3 URL
    // 2. Upload the file directly to S3
    // 3. Get back the unique sharing URL

    // Simulate API call delay
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setUploading(false);
      setUploadComplete(true);
      setShareLink(
        `${DOMAIN_NAME}/download/${Math.random().toString(36).substring(2, 15)}`
      );
    }, 2500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetUpload = () => {
    setFile(null);
    setUploadComplete(false);
    setShareLink("");
    setProgress(0);
  };

  return (
    <div className="space-y-6">
      {!file && !uploadComplete ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-4 border-dashed border-amber-700 rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragActive ? "bg-amber-200" : "bg-amber-50 hover:bg-amber-100"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4">
            <Upload className="h-12 w-12 text-amber-700" />
            <div>
              <p className="font-bold text-lg">Drop your file here</p>
              <p className="text-amber-700">or click to browse</p>
            </div>
            <p className="text-xs text-amber-600 mt-2">
              Maximum file size: 100MB
            </p>
          </div>
        </div>
      ) : (
        <div className="border-4 border-amber-700 rounded-lg p-6 bg-amber-50">
          {!uploadComplete ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="bg-amber-200 p-2 rounded">
                    <File className="h-6 w-6 text-amber-700" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium truncate">{file?.name}</p>
                    <p className="text-xs text-amber-700">
                      {file?.size ? (file.size / 1024 / 1024).toFixed(2) : "0"}{" "}
                      MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetUpload}
                  className="h-8 w-8 rounded-full bg-amber-200 text-amber-700 hover:bg-amber-300"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <Progress value={progress} className="h-2 bg-amber-200" />
                <div className="flex justify-between">
                  <p className="text-sm text-amber-700">
                    {uploading ? "Uploading..." : "Ready to upload"}
                  </p>
                  <p className="text-sm font-medium">{progress}%</p>
                </div>

                <Button
                  onClick={handleUpload}
                  disabled={uploading || !file}
                  className="w-full bg-amber-700 hover:bg-amber-800 text-amber-50 font-medium"
                >
                  {uploading ? "Uploading..." : "Upload File"}
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <Check className="h-6 w-6" />
                <p className="font-medium">Upload Complete!</p>
              </div>

              <div className="p-4 bg-amber-200 rounded-lg">
                <p className="text-sm font-medium mb-2">
                  Share this link (expires in 24 hours):
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 p-2 text-sm bg-amber-50 border border-amber-400 rounded"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="bg-amber-100 border-amber-400 text-amber-800 hover:bg-amber-200"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                onClick={resetUpload}
                variant="outline"
                className="w-full border-amber-700 text-amber-700 hover:bg-amber-100"
              >
                Upload Another File
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="bg-amber-200 border-2 border-amber-600 rounded-lg p-4 text-sm">
        <p className="font-medium mb-1">🔒 Your files are secure</p>
        <p>
          Files are automatically deleted after 24 hours. No registration
          required.
        </p>
      </div>
    </div>
  );
}
