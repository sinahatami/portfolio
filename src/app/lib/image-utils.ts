export const getImageProps = (src: string, alt: string) => ({
  src,
  alt,
  width: 48,
  height: 48,
  loading: "lazy" as const,
  className: "object-contain",
  onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = "none";
  },
});
