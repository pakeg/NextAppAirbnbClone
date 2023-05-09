"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface IUploadImageInputProps {
  onChange: (value: string) => void;
  value: string;
}

const UploadImageInput: React.FC<IUploadImageInputProps> = ({
  onChange,
  value,
}) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="htvjuz86"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="flex flex-col justify-center items-center
        gap-4 text-neutral-600 border-neutral-300 border-2 border-dashed p-20
        transition cursor-pointer hover:opacity-70 relative"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-xs">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadImageInput;
