import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Command,
  Copy,
  FileText,
  Github,
  Hash,
  Linkedin,
  LoaderCircle,
  Mail,
  MapPin,
  Menu,
  Mic,
  MicOff,
  Moon,
  Printer,
  RotateCcw,
  Search,
  Star,
  Sun,
  X,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon registry. Non-UI code (commands, content) refers to icons by name, and
 * only the `Icon` atom resolves names to components. This keeps lucide an
 * implementation detail that can be swapped in one place.
 */
export const ICONS = {
  "arrow-left": ArrowLeft,
  "arrow-up-right": ArrowUpRight,
  book: BookOpen,
  check: Check,
  "chevron-down": ChevronDown,
  command: Command,
  copy: Copy,
  file: FileText,
  github: Github,
  hash: Hash,
  linkedin: Linkedin,
  loader: LoaderCircle,
  mail: Mail,
  "map-pin": MapPin,
  menu: Menu,
  mic: Mic,
  "mic-off": MicOff,
  moon: Moon,
  printer: Printer,
  reset: RotateCcw,
  search: Search,
  star: Star,
  sun: Sun,
  x: X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;
