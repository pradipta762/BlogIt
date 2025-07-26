import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePostPreviewStore = create(
  persist(
    set => ({
      previewPost: null,
      setPreviewPost: data => set({ previewPost: data }),
      clearPreviewPost: () => set({ previewPost: null }),
    }),
    {
      name: "preview-post",
    }
  )
);

export default usePostPreviewStore;
