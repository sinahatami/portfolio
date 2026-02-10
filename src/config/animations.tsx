export const ENABLE_ANIMATIONS = false;

/**
 * Simple static version of motion.div
 */
export const StaticDiv = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};
