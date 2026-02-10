import "server-only";

import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { appConfig } from "@/config";

/**
 * ======================================================
 * Lazy S3 client (NO initialization at import time)
 * ======================================================
 */
function getS3Client() {
  const region = appConfig.s3.region;

  if (!region) {
    throw new Error("AWS region is missing (appConfig.s3.region)");
  }

  if (!appConfig.s3.accessKey || !appConfig.s3.secretKey) {
    throw new Error("AWS credentials are missing");
  }

  return new S3Client({
    region,
    credentials: {
      accessKeyId: appConfig.s3.accessKey,
      secretAccessKey: appConfig.s3.secretKey
    }
  });
}

const UPLOAD_FOLDER = "uploads";
const BUCKET_NAME = appConfig.s3.bucketName!;

/**
 * Extract S3 key from a full object URL
 */
export function extractKeyFromUrl(url: string) {
  try {
    if (!url) throw new Error("Empty URL provided");

    const urlObject = new URL(url);
    const key = urlObject.pathname.replace(/^\//, "");

    if (urlObject.hostname.includes(BUCKET_NAME)) {
      return key;
    }

    if (key.startsWith(BUCKET_NAME + "/")) {
      return key.substring(BUCKET_NAME.length + 1);
    }

    return key;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to extract key from S3 URL: ${message}`);
  }
}

/**
 * Upload file to S3
 */
export async function uploadToStorage(
  file: File,
  options: { contentType?: string; folder?: string } = {}
) {
  try {
    const s3Client = getS3Client();

    const { contentType = file.type, folder = UPLOAD_FOLDER } = options;

    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const key = `${folder}/${timestamp}-${originalName}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: contentType
      })
    );

    return `https://${BUCKET_NAME}.s3.${appConfig.s3.region}.amazonaws.com/${key}`;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to upload file to aws s3: ${message}`);
  }
}

/**
 * Remove file from S3
 */
export async function removeFromStorage(url: string) {
  try {
    if (!url) {
      throw new Error("A valid URL must be provided");
    }

    if (!url.includes(BUCKET_NAME)) {
      console.warn(
        `URL does not belong to bucket (${BUCKET_NAME}). Skipping delete: ${url}`
      );
      return false;
    }

    const s3Client = getS3Client();
    const key = extractKeyFromUrl(url);

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key
      })
    );

    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to remove object from aws s3: ${message}`);
  }
}