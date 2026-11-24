"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useState } from "react";
import { Button, Icon } from "@/components/atoms";
import type { NavItem } from "@/config/navigation";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  items: NavItem[];
  isActive: (item: NavItem) => boolean;
}

export function MobileNav({ items, isActive }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Icon name="menu" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 md:hidden dark:bg-black/60" />
        <Dialog.Content className="bg-background border-border fixed inset-x-0 top-0 z-50 border-b px-5 pt-4 pb-8 shadow-xl md:hidden">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-muted-foreground text-sm">
              Menu
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close menu">
                <Icon name="x" />
              </Button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Jump to a section of the site.
          </Dialog.Description>
          <nav aria-label="Mobile">
            <ul className="mt-2 grid">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "type-title border-border block border-b py-3 text-2xl",
                      isActive(item) ? "text-link" : "text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
