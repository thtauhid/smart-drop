"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Copy, Download, File, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FileData {
  id: string;
  name: string;
  size: number;
  uploadedAt: Date;
  expiresAt: Date;
}

export function FileDownload({ fileData }: { fileData: FileData }) {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("");

  // Calculate and update time remaining until expiration
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const diffMs = fileData.expiresAt.getTime() - now.getTime();

      if (diffMs <= 0) {
        setTimeRemaining("Expired");
        return;
      }

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      setTimeRemaining(`${hours}h ${minutes}m`);
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [fileData.expiresAt]);

  const handleDownload = () => {
    setDownloading(true);
    setProgress(0);

    // Simulate download progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);

    // In a real implementation, you would:
    // 1. Call your API to get a pre-signed S3 URL for downloading
    // 2. Use that URL to download the file

    // Simulate download completion
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);

      // In a real implementation, you would trigger the actual file download here
      // For this demo, we'll just simulate it
      setTimeout(() => {
        setDownloading(false);

        // Create a fake download
        const link = document.createElement("a");
        link.href = "#";
        link.download = fileData.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 500);
    }, 1500);
  };

  const copyLinkToClipboard = () => {
    // In a real app, this would be the actual share URL
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-4 border-amber-700 rounded-lg p-6 bg-amber-50">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-amber-200 p-2 rounded flex-shrink-0">
            <File className="h-8 w-8 text-amber-700" />
          </div>
          <div className="overflow-hidden flex-1">
            <p className="font-bold truncate text-lg">{fileData.name}</p>
            <p className="text-sm text-amber-700">
              {fileData.size.toFixed(2)} MB
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-amber-100 p-3 rounded border border-amber-300">
              <p className="text-amber-700 mb-1">Uploaded</p>
              <p className="font-medium">{formatDate(fileData.uploadedAt)}</p>
            </div>

            <div className="bg-amber-100 p-3 rounded border border-amber-300">
              <p className="text-amber-700 mb-1">Expires in</p>
              <div className="flex items-center gap-1 font-medium">
                <Clock className="h-4 w-4" />
                <span>{timeRemaining}</span>
              </div>
            </div>
          </div>

          {downloading ? (
            <div className="space-y-2">
              <Progress value={progress} className="h-2 bg-amber-200" />
              <p className="text-sm text-center text-amber-700">
                Downloading... {progress}%
              </p>
            </div>
          ) : (
            <Button
              onClick={handleDownload}
              className="w-full bg-amber-700 hover:bg-amber-800 text-amber-50 font-medium h-12"
            >
              <Download className="mr-2 h-5 w-5" />
              Download File
            </Button>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={copyLinkToClipboard}
              variant="outline"
              className="flex-1 border-amber-600 text-amber-700 hover:bg-amber-100"
            >
              {copied ? (
                <>Copy Link (Copied!)</>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </>
              )}
            </Button>

            <Link href="/" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-amber-600 text-amber-700 hover:bg-amber-100"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share Another File
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-amber-200 border-2 border-amber-600 rounded-lg p-4 text-sm">
        <p className="font-medium mb-1">⏱️ This link expires soon</p>
        <p>
          This file will be automatically deleted after 24 hours from upload
          time.
        </p>
      </div>
    </div>
  );
}
