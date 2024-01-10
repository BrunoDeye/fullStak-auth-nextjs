import { create } from "zustand";
import { Action } from "../../types";
import { TestsIds } from "@/types/testsIds";
import { createJSONStorage, persist } from "zustand/middleware";
import { FormStep3Type } from '../components/CreateWarranty/step3/useFormStep3';

type Type = "microFiles" | "stringFiles" | "hybridFiles"

type FileID = `products.${number}.${Type}.${number}.content`

export type FileItem = Action & {
  id: FileID;
};

export type FileStore = {
  fileList: FileItem[];
  add: (file: FileItem) => void;
  removeFile: (id: FileID) => void;
  removeAll: () => void;
};




export const useFileStore = create<FileStore>(
  
    (set, get) => ({
      fileList: [],
      add: (file: FileItem) =>
        set((prevState) => {
          const updatedFiles = [
            ...prevState.fileList,
            { ...file },
          ] satisfies FileItem[];

          return { fileList: updatedFiles };
        }),
      removeFile: (id: FileID) => {
        const files = get().fileList;

        const updatedFiles = removeFromFiles(files, id);

        set({ fileList: [...updatedFiles] });
      },
      removeAll: () => {
        set({ fileList: [] });
      },
    })
);

const removeFromFiles = (fileList: FileItem[], id: FileID): FileItem[] => {
  const item = fileList.find((item) => item.id === id);
  if (item) {
    return fileList.filter((item) => item.id !== id);
  }
  return fileList;
};
