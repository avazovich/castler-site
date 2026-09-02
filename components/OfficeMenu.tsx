"use client";

import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { ChevronDownIcon } from "./icons";

export function OfficeMenu({
  label,
  links,
}: {
  label: string;
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = links.some((link) => link.href === pathname);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className={`pill flex items-center gap-1 ${active || open ? "bg-ink text-paper" : "bg-paper-2 text-ink hover:bg-line"}`}>
          {label}
          <ChevronDownIcon className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="end" sideOffset={10} className="nav-popover z-50 origin-top-right">
          <div className="min-w-[180px] overflow-hidden rounded-2xl border border-line bg-paper py-1.5 shadow-xl">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-5 py-3 text-left font-mono text-xs font-bold uppercase tracking-wide transition-all duration-200 active:scale-[0.97] ${
                    isActive
                      ? "bg-ink text-paper"
                      : "text-ink hover:translate-x-1 hover:bg-paper-2"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
