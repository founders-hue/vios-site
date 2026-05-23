"use client";

import { Drawer } from "vaul";
import { useDrawer } from "@/components/ui/DrawerContext";
import LeadForm from "@/components/ui/LeadForm";
import { copy } from "@/lib/copy";

export default function LeadDrawer() {
  const { isOpen, setOpen } = useDrawer();

  return (
    <Drawer.Root open={isOpen} onOpenChange={setOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-ink-950/70 backdrop-blur-sm" />
        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[90vh] max-w-2xl flex-col rounded-t-2xl border border-ink-100/10 border-b-0 bg-ink-900 px-6 pb-10 pt-4 outline-none"
        >
          <div
            aria-hidden
            className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-ink-100/20"
          />
          <Drawer.Title className="font-serif text-3xl text-ink-50">
            {copy.engage.headline}
          </Drawer.Title>
          <Drawer.Description className="mt-2 text-sm text-ink-100/60">
            {copy.engage.body}
          </Drawer.Description>

          <div className="mt-8 overflow-y-auto">
            <LeadForm />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
