import { Input } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";

function UploadImage({ onChange, fieldChange, imagePreview, fileType, ...field }: any) {



  return (
    <div
      onDragEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onChange(e, fieldChange);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = "copy";
        onChange(e, fieldChange);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onChange(e, fieldChange);
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onChange(e, fieldChange, true);
      }}
      className="flex items-center justify-center w-full"
    >
      <label
        htmlFor="image"
        className={`flex flex-col relative items-center justify-center w-full ${imagePreview ? "h-auto" : "h-64"} border-2 border-gray-300 !border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
      >
        {imagePreview &&

        <>

          <iframe className="m-5" width="90%" height={440} src={imagePreview} />
         
        </>}
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-center text-sm text-gray-500 dark:text-gray-400">
              <span className="font-bold">Clique para escolher arquivo</span> ou
              arraste e solte
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG ou JPG (MAX. 800x400px)
            </p>
          </div>
        <Input
          {...field}
          value={field.value?.fileName}
          onChange={(e) => onChange(e, fieldChange)}
          id="image"
          type="file"
          className="hidden"
        />
      </label>
    </div>
  );
}

export default UploadImage;
