import { Download, ImageUp, Link2, RefreshCcw, X } from "lucide-react";
import * as Progress from "@radix-ui/react-progress";
import { Button } from "./ui/button";
import { motion } from "motion/react";

export function UploadWidgetUploadItem() {
  return (
    <div className="p-3 rounded-lg flex flex-col gap-3 shadow-content bg-white/2 relative overflow-hidden">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium flex items-center gap-1">
          <ImageUp size={12} className="text-zinc-300" strokeWidth={1.5} />
          <span>screenshot.png</span>
        </span>

        <span className="text-xxs flex items-center gap-1.5 text-zinc-400">
          300KB
          <div className="size-1 rounded-full bg-zinc-700"></div>
          <span className="text-zinc-600 font-medium">45%</span>
        </span>

        <Progress.Root className="bg-zinc-800 rounded-full h-1 overflow-hidden">
          <motion.div
            variants={{
               open: {
                  width: "100%",
               },
               closed: {
                  width: "0%",
               }
            }}
            initial="closed"
            animate="open"
            transition={{
               duration: 1.5,
               ease: "easeInOut",
            }}
          >
            <Progress.Indicator className={`bg-green-500 h-1 w-[45%]`} />
          </motion.div>
        </Progress.Root>
      </div>

      <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
        <Button size="iconSm">
          <Download size={16} strokeWidth={1.5} />
          <span className="sr-only">Download compressed image</span>
        </Button>

        <Button size="iconSm">
          <Link2 size={16} strokeWidth={1.5} />
          <span className="sr-only">Copy link</span>
        </Button>

        <Button size="iconSm">
          <RefreshCcw size={16} strokeWidth={1.5} />
          <span className="sr-only">Retry upload</span>
        </Button>

        <Button size="iconSm">
          <X size={16} strokeWidth={1.5} />
          <span className="sr-only">Cancel upload</span>
        </Button>
      </div>
    </div>
  );
}
