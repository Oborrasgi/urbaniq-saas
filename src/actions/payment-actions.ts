import React, { useState } from "react";

interface ArchivoDeEntradaProps {
  onChange?: (url: string) => void;
}

export function ArchivoDeEntrada({ onChange }: ArchivoDeEntradaProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const resultado = await uploadFileToStorage(file);

    if (resultado.estado === "exito" && resultado.fileUrl) {
      setPreviewUrl(resultado.fileUrl);
      onChange?.(resultado.fileUrl);
    } else if (resultado.estado === "exito" && resultado.path) {
      setPreviewUrl(resultado.path);
      onChange?.(resultado.path);
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {previewUrl && <img src={previewUrl} alt="Preview" />}
    </div>
  );
}