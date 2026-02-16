export const getImageFallback = (src: string, alt: string) => {
  const onError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = "none";
  };

  return { src, alt, onError };
};
