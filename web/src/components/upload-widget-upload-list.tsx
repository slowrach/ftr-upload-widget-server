import { UploadWidgetUploadItem } from "./upload-widget-item";

export function UploadWidgetUploadList() {
   const isEmpty = false 

   return (
      <div className="px-3 flex flex-col gap-3">
         <span className="text-xs font-medium">Files</span>

         {isEmpty ? (
            <div className="flex flex-col gap-2 items-center">
               <span className="text-xs text-zinc-400">No files uploaded</span>
            </div>
         ) : (
            <div className="flex flex-col gap-2">
               <UploadWidgetUploadItem />
               <UploadWidgetUploadItem />
            </div>
         )}
      </div>
   )
}