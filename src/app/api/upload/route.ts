import { auth } from "@/lib/auth";
import { uploadToStorage } from "@/lib/s3";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const session = await auth();

    if (!file) {
      return Response.json({ error: "File is required!" }, { status: 400 });
    }

    if (!session?.user) {
      return Response.json({ error: "Unauthorized Access!" }, { status: 401 });
    }

    const url = await uploadToStorage(file);
    return Response.json({ status: "success", url });
  } catch (error) {
    console.error("Error uploading file:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
