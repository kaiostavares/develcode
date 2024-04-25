import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends ComponentProps<"button">{
  secondary?: boolean;
}

export function IconButton({secondary, ...props}: IconButtonProps){
  return(
    <button 
      {...props} 
      className={twMerge(
        "border border-black rounded-md p-1.5", 
        secondary ?  "bg-slate-200" : "bg-blue-200",
        props.disabled ? "opacity-50" : null
      )}
    />
  )
}
