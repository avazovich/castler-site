import { readFileSync } from "fs";
import { join } from "path";
import { imageSize } from "image-size";

/**
 * Reads a public/ image's real pixel dimensions from its file header (no
 * decoding, just the header — fast even for very large files). Used to give
 * next/image the intrinsic width/height it needs so it can generate a
 * properly-sized, compressed srcset instead of serving the original file
 * as-is, while the display size (set via CSS) still preserves the image's
 * real aspect ratio untouched.
 */
export function getImageDimensions(publicPath: string): { width: number; height: number } {
  try {
    const filePath = join(process.cwd(), "public", publicPath);
    const { width, height } = imageSize(readFileSync(filePath));
    return { width, height };
  } catch {
    return { width: 4, height: 3 };
  }
}
