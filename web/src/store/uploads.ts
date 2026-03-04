import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";
import { enableMapSet } from "immer";
import { uploadToStorage } from "../http/upload-to-storage";
import { compressImage } from "../utils/compress-image";

export type Upload = {
  name: string;
  file: File;
  abortController: AbortController;
  status: "uploading" | "completed" | "error" | "canceled";
  originalSize: number;
  uploadedSize: number;
};

type UploadState = {
  uploads: Map<string, Upload>;
  addUploads: (file: File[]) => void;
  cancelUpload: (uploadId: string) => void;
};

enableMapSet();

export const useUploads = create<UploadState, [["zustand/immer", never]]>(
  immer((set, get) => {
    function updateUpload(uploadId: string, data: Partial<Upload>) {
      const upload = get().uploads.get(uploadId);

      if (!upload) return;

      set((state) => {
        state.uploads.set(uploadId, { ...upload, ...data });
      });
    }

    async function processUpload(uploadId: string) {
      const upload = get().uploads.get(uploadId);

      if (!upload) return;

      try {
        const compressedFile = await compressImage({
          file: upload.file,
          maxWidth: 200,
          maxHeight: 200,
          quality: 0.5,
        })

        await uploadToStorage(
          {
            file: compressedFile,
            onProgress: (sizeInBytes) => {
              updateUpload(uploadId, { uploadedSize: sizeInBytes });
            },
          },
          { signal: upload.abortController.signal },
        );
        
        updateUpload(uploadId, { status: "completed" });

      } catch {
        updateUpload(uploadId, { status: "error" });
      }
    }

    function cancelUpload(uploadId: string) {
      const upload = get().uploads.get(uploadId);

      if (!upload) return;

      upload.abortController.abort();

      set((state) => {
        state.uploads.set(uploadId, { ...upload, status: "canceled" });
      });
    }

    function addUploads(files: File[]) {
      for (const file of files) {
        const uploadId = crypto.randomUUID();
        const abortController = new AbortController();

        const upload: Upload = {
          name: file.name,
          file,
          abortController,
          status: "uploading",
          originalSize: file.size,
          uploadedSize: 0,
        };

        set((state) => {
          state.uploads.set(uploadId, upload);
        });
      }
    }

    return {
      uploads: new Map(),
      addUploads,
      cancelUpload,
    };
  }),
);

export const usePendingUploads = () => {
  return useUploads(
    useShallow((store) => {
      const isPending = Array.from(store.uploads.values()).some(
        (upload) => upload.status === "uploading",
      );

      if (!isPending) {
        return { isPending, globalPercentage: 100 };
      }

      const { total, uploaded } = Array.from(store.uploads.values()).reduce(
        (acc, upload) => {
          acc.total += upload.originalSize;
          acc.uploaded += upload.uploadedSize;

          return acc;
        },
        { total: 0, uploaded: 0 },
      );

      const globalPercentage = Math.min(
        Math.round((uploaded * 100) / total),
        100,
      );

      return { isPending, globalPercentage };
    }),
  );
};
