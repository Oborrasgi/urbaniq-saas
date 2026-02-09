import "server-only";

import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { appConfig } from "@/config";

/**
 * ============================================
 * Configure S3 client with environment variables
 * ============================================
 */
const s3Client = new S3Client({
  region: appConfig.s3.region!,
  credentials: {
    accessKeyId: appConfig.s3.accessKey!,
    secretAccessKey: appConfig.s3.secretKey!
  }
});

const UPLOAD_FOLDER = "uploads";
const BUCKET_NAME = appConfig.s3.bucketName!;

export function extractKeyFromUrl(url: string) {
  try {
    if (!url) throw new Error("Empty URL provided");

    // Parse the URL to get the S3 Object Key
    const urlObject = new URL(url);

    // Extract the pathname and remove leading slash
    // pathname gives us "/path/to/object.jpg", we want "path/to/object.jpg"
    const key = urlObject.pathname.replace(/^\//, "");

    // If the URL contains the bucket name in the hostname (virtual-hosted style URL)
    if (urlObject.hostname.includes(BUCKET_NAME)) {
      // The key is the pathname without leading slash
      return key;
    }

    // If the URL is path-style (bucket name is in the path)
    if (key.startsWith(BUCKET_NAME + "/")) {
      return key.substring(BUCKET_NAME.length + 1);
    }

    return key;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to extract key from S3 URL: ${message}`);
  }
}

export async function uploadToStorage(
  file: File,
  options: { contentType?: string; folder?: string } = {}
) {
  try {
    const { contentType = file.type, folder = UPLOAD_FOLDER } = options;

    // Create a unique filename with timestamp and original name
    const timestamp = new Date().getTime();
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const key = `${folder}/${timestamp}-${originalName}`;

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload file to aws s3
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType
      //   ACL: "public-read" // comment it if you want to make objects private
    });

    await s3Client.send(command);

    return `https://${BUCKET_NAME}.s3.${appConfig.s3.region}.amazonaws.com/${key}`;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to upload file to aws s3: ${message}`);
  }
}

export async function removeFromStorage(url: string) {
  try {
    if (!url) {
      throw new Error("A valid URL must be provided to remove an object from storage.");
    }

    // Check if the provided URL belongs to the configured S3 bucket
    if (!url.includes(BUCKET_NAME)) {
      console.warn(
        `The provided URL does not belong to the configured S3 bucket (${BUCKET_NAME}). Skipping removal: ${url}`
      );

      return false;
    }

    const key = extractKeyFromUrl(url);

    // Delete file/image from aws s3
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    });

    await s3Client.send(command);
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to remove object from aws s3: ${message}`);
  }
}
