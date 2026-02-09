import { Loader, X } from "lucide-react";
import { useState } from "react";

import { uploadFileToStorage } from "@/actions/file-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InputFileProps {
  label?: string;
  description?: string;
  onChange?: (url: string) => void;
  value?: string;
  error?: boolean;
}

export function InputFile({
  label = "Upload File",
  description = "Click to upload your svg, png, jpg or gif file",
  onChange,
  value,
  error
}: InputFileProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const result = await uploadFileToStorage(file);

      if (result.status === "success" && result.fileUrl) {
        setPreviewUrl(result.fileUrl);
        onChange?.(result.fileUrl);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onChange?.("");
  };

  return (
    <div>
      <label
        htmlFor="dropzone-file"
        className={cn(
          "border-border bg-card hover:border-primary mx-auto mt-2 flex w-full cursor-pointer flex-col items-center rounded-lg border border-dashed p-6 text-center transition-colors",
          error && "border-destructive bg-destructive/5 hover:border-destructive"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="text-muted-foreground size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>

        <h2 className="text-foreground mt-1 font-medium tracking-wide">{label}</h2>
        <p className="text-muted-foreground mt-2 text-xs tracking-wide">{description}</p>

        <input
          id="dropzone-file"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>

      {isUploading && !previewUrl ? (
        <Avatar className="mt-4 size-24 rounded-xl">
          <AvatarImage src={undefined} alt="uploading..." />
          <AvatarFallback>
            <Loader className="size-4 animate-spin" />
          </AvatarFallback>
        </Avatar>
      ) : null}

      {previewUrl && !isUploading ? (
        <div className="relative mt-4 size-24">
          <Avatar className="size-24 rounded-xl">
            <AvatarImage src={previewUrl} alt="Preview" />
            <AvatarFallback>
              <Loader className="size-4 animate-spin" />
            </AvatarFallback>
          </Avatar>

          <Button
            size="icon"
            variant="destructive"
            className="absolute top-1 right-1 size-4"
            onClick={handleRemove}
          >
            <X className="size-3" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
