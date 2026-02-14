import { Loader, UploadCloud, X } from "lucide-react";
import { useEffect, useId, useState } from "react";

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
  disabled?: boolean;
}

export function InputFile({
  label = "Upload File",
  description = "SVG, PNG, JPG or GIF. Max 5MB.",
  onChange,
  value,
  error,
  disabled
}: InputFileProps) {
  const inputId = useId();

  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
  const [isUploading, setIsUploading] = useState(false);

  // Sync external value changes (important for form reset/edit mode)
  useEffect(() => {
    setPreviewUrl(value || null);
  }, [value]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      const result = await uploadFileToStorage(file);

      if (result.status === "success" && result.data?.url) {
        setPreviewUrl(result.data.url);
        onChange?.(result.data.url);
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
    <div className="space-y-4">
      <label
        htmlFor={inputId}
        className={cn(
          "border-border bg-card hover:border-primary group relative flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center transition-all duration-200",
          "hover:bg-muted/40",
          error && "border-destructive bg-destructive/5 hover:border-destructive",
          (disabled || isUploading) && "pointer-events-none opacity-60"
        )}
      >
        <UploadCloud className="text-muted-foreground group-hover:text-primary size-10 transition-colors" />

        <h2 className="text-foreground mt-3 font-semibold tracking-tight">
          {isUploading ? "Uploading..." : label}
        </h2>

        <p className="text-muted-foreground mt-1 text-xs">{description}</p>

        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading || disabled}
        />
      </label>

      {isUploading && (
        <div className="flex justify-center">
          <Avatar className="size-24 rounded-xl">
            <AvatarFallback>
              <Loader className="size-5 animate-spin" />
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      {previewUrl && !isUploading && (
        <div className="relative mx-auto size-28">
          <Avatar className="size-28 rounded-2xl border">
            <AvatarImage src={previewUrl} alt="Preview" />
            <AvatarFallback>
              <Loader className="size-4 animate-spin" />
            </AvatarFallback>
          </Avatar>

          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute -top-2 -right-2 size-7 rounded-full shadow"
            onClick={handleRemove}
          >
            <X className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}