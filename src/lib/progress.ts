import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CourseId } from "./curriculum";

type ProgressState = {
  done: Partial<Record<CourseId, boolean>>;
  mark: (id: CourseId) => void;
  unmark: (id: CourseId) => void;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      done: {},
      mark: (id) => set((s) => ({ done: { ...s.done, [id]: true } })),
      unmark: (id) => set((s) => ({ done: { ...s.done, [id]: false } })),
    }),
    { name: "lyra-course-progress" },
  ),
);
