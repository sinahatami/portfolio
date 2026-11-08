import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "span" | "p";
}

const Skeleton = ({
  className,
  as: Component = "div",
  ...props
}: SkeletonProps) => {
  return (
    <Component
      className={cn("bg-muted animate-pulse rounded-md", className)}
      {...props}
    />
  );
};

export { Skeleton };
