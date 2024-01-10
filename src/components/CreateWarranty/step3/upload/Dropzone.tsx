// imports
import { FiUploadCloud } from "react-icons/fi";
import { LuFileSymlink } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import ReactDropzone, { Accept, ErrorCode } from "react-dropzone";
import bytesToSize from "@/utils/bytesToSize";
import fileToIcon from "@/utils/fileToIcon";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import compressFileName from "@/utils/compressFileName";
import { Skeleton } from "@/components/ui/skeleton";
import { ImSpinner3 } from "react-icons/im";
import { MdDone } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { HiOutlineDownload } from "react-icons/hi";
import { BiError } from "react-icons/bi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Action } from "@/../types";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { Button } from "@nextui-org/react";
import useStore from "@/store/useStore";
import { FileItem, FileStore, useFileStore } from "@/store/fileList";
import { TestsIds } from "@/types/testsIds";
import loadFfmpeg from "@/utils/loadFFmpeg";
import { ControllerRenderProps, FieldPathValue, UseFormReturn, UseFormSetValue, FieldValues, FieldName, FieldPath } from "react-hook-form";
import {  FormStep3Type } from "../useFormStep3";
const extensions = {
  image: [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "ico",
    "tif",
    "tiff",
    "svg",
    "raw",
    "tga",
  ],
  video: [
    "mp4",
    "m4v",
    "mp4v",
    "3gp",
    "3g2",
    "avi",
    "mov",
    "wmv",
    "mkv",
    "flv",
    "ogv",
    "webm",
    "h264",
    "264",
    "hevc",
    "265",
  ],
  audio: ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"],
};

type FileTypes = "pdf" | "image" | "video" | "audio";

type Props = {
  onFormsChange: (...event: any[]) => void;
  id: any;
  type?: FileTypes[];
  formStep3: UseFormReturn<FormStep3Type, any, undefined>;
  code: number;
};

const fileTypeMapping = {
  pdf: "application/pdf",
  image: "image/*",
  video: "video/*",
  audio: "audio/*",
};

const txtFileTypeMapping: Record<FileTypes, string> = {
  pdf: "PDF",
  image: "Imagens",
  video: "Video",
  audio: "Audio",
};

export default function Dropzone({
  onFormsChange,
  id,
  type = ["pdf", "image", "video", "audio"],
  formStep3,
  code
}: Props) {
  const [fileList, add, removeFile] = useFileStore((state) => [
    state.fileList,
    state.add,
    state.removeFile,
  ]);


  // variables & hooks
  const { toast } = useToast();
  const [is_hover, setIsHover] = useState<boolean>(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [is_ready, setIsReady] = useState<boolean>(false);
  const [is_loaded, setIsLoaded] = useState<boolean>(false);
  const [is_converting, setIsConverting] = useState<boolean>(false);
  const [is_done, setIsDone] = useState<boolean>(false);
  const ffmpegRef = useRef<any>(null);
  const [selcted, setSelected] = useState<string>("...");

  const accepted_files: Accept = {
    "image/*": [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".webp",
      ".ico",
      ".tif",
      ".tiff",
      ".raw",
      ".tga",
    ],
    "audio/*": [],
    "video/*": [],
    "application/pdf": [".pdf"],
  };

  const getFileTypesString = (types: FileTypes[]): string => {
    const selectedFileTypes = types.map((type) => txtFileTypeMapping[type]);

    if (types.length >= 3) {
      const lastTwo = selectedFileTypes.slice(-2).join(" e ");
      const rest = selectedFileTypes.slice(0, -2).join(", ");
      return `${rest}, ${lastTwo}`;
    }

    return selectedFileTypes.join(" e ");
  };
  const filterAcceptedFiles = (types?: FileTypes[]): Accept => {
    if (!types || types.length === 0) {
      return {};
    }

    return types.reduce((filteredFiles, fileType) => {
      filteredFiles[fileTypeMapping[fileType]] =
        accepted_files[fileTypeMapping[fileType]];
      return filteredFiles;
    }, {} as Accept);
  };
  // functions
  const reset = () => {
    setIsDone(false);
    setActions([]);
    setIsReady(false);
    setIsConverting(false);
  };

  // const download = (action: Action) => {
  //   const a = document.createElement("a");
  //   a.style.display = "none";
  //   a.href = action.url;
  //   a.download = action.output;

  //   document.body.appendChild(a);
  //   a.click();

  //   // Clean up after download
  //   URL.revokeObjectURL(action.url);
  //   document.body.removeChild(a);
  // };
  // const convert = async (): Promise<any> => {
  //   let tmp_actions = actions.map((elt) => ({
  //     ...elt,
  //     is_converting: true,
  //   }));
  //   setActions(tmp_actions);
  //   setIsConverting(true);
  //   for (let action of tmp_actions) {
  //     try {
  //       const { url, output } = await convertFile(ffmpegRef.current, action);
  //       tmp_actions = tmp_actions.map((elt) =>
  //         elt === action
  //           ? {
  //               ...elt,
  //               is_converted: true,
  //               is_converting: false,
  //               url,
  //               output,
  //             }
  //           : elt
  //       );
  //       setActions(tmp_actions);
  //     } catch (err) {
  //       tmp_actions = tmp_actions.map((elt) =>
  //         elt === action
  //           ? {
  //               ...elt,
  //               is_converted: false,
  //               is_converting: false,
  //               is_error: true,
  //             }
  //           : elt
  //       );
  //       setActions(tmp_actions);
  //     }
  //   }
  //   setIsDone(true);
  //   setIsConverting(false);
  // };
  const handleUpload = (data: Array<any>, fileRejections: any): void => {
    handleExitHover();

    if (fileRejections.length) {
      const { file, errors } = fileRejections[0];
      const { name } = file;
      console.log(errors);
      const fileErrorMsg =
        errors[0].code === "file-invalid-type"
          ? `Erro enviando seu arquivo do tipo "${file.type}"`
          : errors[0].code === "file-too-large"
          ? "Arquivo excede tamanho máximo, limite de 128 MB"
          : "Algo deu errado, tente novamente";

      toast({
        variant: "destructive",
        title: fileErrorMsg,
        description: `Arquivos permitidos: ${getFileTypesString(type)}.`,
        duration: 5000,
      });

      return;
    }
    const tmp: Action[] = [];
    data.forEach((file: any) => {
      const formData = new FormData();
      formData.append("image", file);
      // react hook forms
      onFormsChange(file);
      formStep3.setValue(`${id}.code` as any, code)
      tmp.push({
        file_name: file.name,
        file_size: file.size,
        from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
        to: null,
        file_type: file.type,
        file,
        is_error: false,
      });
      add({
        file_name: file.name,
        file_size: file.size,
        from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
        to: null,
        file_type: file.type,
        file,
        is_error: false,
        id,
      });
    });

    setActions(tmp);
  };
  const handleHover = (): void => setIsHover(true);
  const handleExitHover = (): void => setIsHover(false);
  const updateAction = (file_name: String, to: String) => {
    setActions(
      actions.map((action): Action => {
        if (action.file_name === file_name) {
          console.log("FOUND");
          return {
            ...action,
            to,
          };
        }

        return action;
      })
    );
  };
  const checkIsReady = (): void => {
    let tmp_is_ready = true;
    actions.forEach((action: Action) => {
      if (!action.to) tmp_is_ready = false;
    });
    setIsReady(tmp_is_ready);
  };
  const deleteAction = (action: Action): void => {
    setActions(actions.filter((elt) => elt !== action));
  };
  useEffect(() => {
    if (!actions.length) {
      setIsDone(false);
      setIsReady(false);
    } else checkIsReady();
  }, [actions]);
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setIsLoaded(true);
  };

  // returns
  if (fileList.length && fileList.some((file: FileItem) => file.id === id)) {
    return (
      <div className="space-y-6 overflow-x-hidden">
        {fileList
          .filter((file: FileItem) => file.id === id)
          .map((action: FileItem, i: any) => (
            <div
              key={i}
              className="overflow-x-hidden max-md:relative max-md:py-16 w-full py-4 space-y-2 lg:py-0 relative cursor-pointer rounded-xl border h-fit lg:h-20 px-4 lg:px-10 flex flex-wrap lg:flex-nowrap items-center justify-between"
            >
              {!is_loaded && (
                <Skeleton className="h-full w-full -ml-10 cursor-progress absolute rounded-xl" />
              )}
              <div className="flex gap-4 items-center">
                <span className="text-2xl text-orange-600">
                  {fileToIcon(action.file_type)}
                </span>
                <div className="flex items-center gap-1 w-96">
                  <span className="text-md font-medium overflow-x-hidden">
                    {compressFileName(action.file_name)}
                  </span>
                  <span className="text-gray-400 text-sm">
                    ({bytesToSize(action.file_size)})
                  </span>
                </div>
              </div>

              <div className="max-md:absolute max-md:right-0  max-md:top-0 text-gray-400 text-md flex items-center gap-4">
                <span
                  onClick={() => {
                    onFormsChange(undefined);
                    formStep3.setValue(`${id}.code` as any, undefined)
                    removeFile(action.id);
                  }}
                  className="cursor-pointer  hover:bg-gray-50 rounded-full h-10 w-10 flex items-center justify-center text-2xl text-gray-400"
                >
                  <MdClose />
                </span>
              </div>
            </div>
          ))}
        <div className="flex w-full justify-end"></div>
      </div>
    );
  }

  return (
    <ReactDropzone
      onDrop={handleUpload}
      onDragEnter={handleHover}
      onDragLeave={handleExitHover}
      accept={filterAcceptedFiles(type)}
      maxSize={128 * 1024 * 1024}
      onDropRejected={() => {
        handleExitHover();
      }}
      onError={(err) => {
        handleExitHover();
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className=" bg-gray-50 h-72 lg:h-80 xl:h-96 rounded-3xl px-2 shadow-sm border-2 border-dashed cursor-pointer flex items-center justify-center"
        >
          <input {...getInputProps()} />
          <div className=" space-y-4 text-gray-500">
            {is_hover ? (
              <>
                <div className="justify-center flex text-6xl">
                  <LuFileSymlink />
                </div>
                <h3
                  title="Drag me"
                  className="text-center  font-medium text-2xl"
                >
                  Solte-o aqui
                </h3>
              </>
            ) : (
              <>
                <div className="justify-center flex text-6xl">
                  <FiUploadCloud />
                </div>
                <h3 className=" text-center font-medium text-2xl">
                  Clique ou arraste para adicionar seu arquivo
                </h3>
              </>
            )}
          </div>
        </div>
      )}
    </ReactDropzone>
  );
}
