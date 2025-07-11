import { findById, removeById } from "@bigbinary/neeto-cist";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCategoryStore = create(
  persist(
    (set, get) => ({
      selectedCategory: [],
      toggleSelect: category => {
        const { selectedCategory } = get();

        const updatedCategory = findById(category.id, selectedCategory)
          ? removeById(category.id, selectedCategory)
          : [...selectedCategory, category];

        set({ selectedCategory: updatedCategory });
      },
      clearSelected: () => set({ selectedCategory: [] }),

      isSelectedCategory: category =>
        findById(category.id, get().selectedCategory || []),
    }),
    {
      name: "category-store",
    }
  )
);

export default useCategoryStore;
