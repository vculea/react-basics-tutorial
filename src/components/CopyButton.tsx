// Buton reutilizabil: copiaza textul primit si arata 2 secunde o confirmare,
// apoi revine la iconita initiala. Extras din ShareableLink cand a mai
// aparut nevoia lui intr-un al doilea demo (SidebarNavigation).

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  text: string;
};

export function CopyButton({ text }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button variant="secondary" size="sm" onClick={handleCopy} className="absolute top-3 right-3 gap-1.5">
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? "Copiat!" : "Copiază"}
    </Button>
  );
}
