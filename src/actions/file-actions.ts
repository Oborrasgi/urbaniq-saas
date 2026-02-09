"use server";

import { getCurrentUser } from "@/lib/auth";
import { removeFromStorage, uploadToStorage } from "@/lib/s3";

/* ==========================================================================
 * Types
 * ========================================================================== */
type ActionResult<T = undefined> =
  | { status: "success"; data?: T }
  | { status: "error"; message: string };

/* ==========================================================================
 * Upload file (authenticated)
 * ========================================================================== */
export async function uploadFileToStorage(
  file: File
): Promise<ActionResult<{ url: string }>> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        status: "error",
        message: "UNAUTHORIZED"
      };
    }

    if (!file) {
      return {
        status: "error",
        message: "FILE_REQUIRED"
      };
    }

    // ⛔️ Punto futuro: límites por plan / tenant
    // if (file.size > MAX_FILE_SIZE) {}

    const url = await uploadToStorage(file);

    return {
      status: "success",
      data: { url }
    };
  } catch (error) {
    console.error("[UPLOAD_FILE_ERROR]", error);

    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "UPLOAD_FAILED"
    };
  }
}

/* ==========================================================================
 * Remove file (authenticated)
 * ========================================================================== */
export async function removeFileFromStorage(
  url: string
): Promise<ActionResult<{ deleted: boolean }>> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        status: "error",
        message: "UNAUTHORIZED"
      };
    }

    if (!url) {
      return {
        status: "error",
        message: "URL_REQUIRED"
      };
    }

    const deleted = await removeFromStorage(url);

    return {
      status: "success",
      data: { deleted }
    };
  } catch (error) {
    console.error("[REMOVE_FILE_ERROR]", error);

    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "DELETE_FAILED"
    };
  }
}