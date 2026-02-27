import { useUploads } from "../store/uploads";
import { UploadWidgetUploadItem } from "./upload-widget-item";

export function UploadWidgetUploadList() {
   const uploads = useUploads(store => store.uploads)
   
   const isEmpty = uploads.size === 0 

   return (
      <div className="px-3 flex flex-col gap-3">
         <span className="text-xs font-medium">Files</span>

         {isEmpty ? (
            <div className="flex flex-col gap-2 items-center">
               <span className="text-xs text-zinc-400">No files uploaded</span>
            </div>
         ) : (
            <div className="flex flex-col gap-2">
               {Array.from(uploads.entries()).map(([uploadId, upload]) => (
                  <UploadWidgetUploadItem key={uploadId} upload={upload} />
               ))}
            </div>
         )}
      </div>
   )
}