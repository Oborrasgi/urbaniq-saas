export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { auth } from "@/lib/auth";
import { uploadToStorage } from "@/lib/s3";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const session = await auth();

    if (!file) {
      return Response.json(
        { status: "error", message: "File is required" },
        { status: 400 }
      );
    }

    if (!session?.user) {
      return Response.json(
        { status: "error", message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const url = await uploadToStorage(file);

    return Response.json({
      status: "success",
      data: { url }
    });
  } catch (error) {
    console.error("Error uploading file:", error);

    return Response.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
