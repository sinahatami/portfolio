import { Button } from "@/components/ui";
import { Menu, X } from "@/lib/icons";

interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export function MobileMenuButton({
  isMenuOpen,
  onToggleMenu,
}: MobileMenuButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      aria-label="Toggle menu"
      onClick={onToggleMenu}
    >
      {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  );
}
