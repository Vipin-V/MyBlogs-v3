/**
 * A tiny 1x1 pixel base64-encoded transparent gray PNG.
 * Used as the blurDataURL for Next.js <Image> placeholder="blur"
 * on remote images where auto blur-generation is not available.
 *
 * This produces a soft neutral shimmer before the real image loads.
 */
export const shimmerBlurDataURL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//9/AxIAAAkAAX9YoggAAAAASUVORK5CYII=";
