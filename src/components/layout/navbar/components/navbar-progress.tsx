interface NavbarProgressProps {
  scrollProgress: number;
}

export function NavbarProgress({ scrollProgress }: NavbarProgressProps) {
  return (
    <div className="from-accent fixed top-0 right-0 left-0 z-[100] h-0.5 bg-gradient-to-r via-blue-500 to-purple-500">
      <div
        className="h-full bg-white transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
