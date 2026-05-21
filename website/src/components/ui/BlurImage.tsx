import Image, { type ImageProps } from "next/image";
import { blurFor } from "@/lib/blur";

/**
 * Drop-in replacement for next/image's <Image>.
 *
 * Supplies a real blurred preview (LQIP) placeholder resolved
 * from the image `src` via the auto-generated BLUR_MAP, so the
 * loading state matches each photo's colours instead of flashing
 * a flat box. New images get a correct placeholder automatically
 * — no per-call `blurDataURL` wiring needed.
 *
 * Explicit `placeholder` / `blurDataURL` props still win.
 */
export default function BlurImage({ placeholder, blurDataURL, src, ...rest }: ImageProps) {
  return (
    <Image
      src={src}
      placeholder={placeholder ?? "blur"}
      blurDataURL={blurDataURL ?? blurFor(src)}
      {...rest}
    />
  );
}
