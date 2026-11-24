import { Tag } from "@/components/atoms";
import { cn } from "@/lib/utils";

interface TagListProps {
  items: string[];
  label: string;
  className?: string;
}

/** A labelled list of tags (rendered as a real list for screen readers). */
export function TagList({ items, label, className }: TagListProps) {
  if (items.length === 0) return null;
  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
