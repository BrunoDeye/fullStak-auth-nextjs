import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  error?: string;
}

const InputBox = ({ labelText, error, className, ...props }: Props) => {
  return (
    <div>
      <label
        className={`${className} block text-slate-600  mb-2 text-xs lg:text-sm xl:text-base `}
      >
        {labelText}
      </label>
      <input
        
        className={`border text-black  rounded-md disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500 
              ${
                error ? " border-red-500   animate-shake" : "border-slate-400"
              }`}
        {...props}
        name={labelText}
      ></input>
    </div>
  );
};

export default InputBox;
