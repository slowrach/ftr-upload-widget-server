import * as Collapsible from "@radix-ui/react-collapsible";
import { Maximize2 } from "lucide-react";
import { UploadWidgetTitle } from "./upload-widget-title";

export function UploadWidgetMinimizedButton() {
   return (
      <Collapsible.Trigger className="group w-full px-5 py-3 bg-white/2 flex items-center justify-between">
         <UploadWidgetTitle />

         <Maximize2 strokeWidth={1.5} size={16} className="text-zinc-400 group-hover:text-zinc-100 group-hover:cursor-pointer" />
      </Collapsible.Trigger>
   )
}