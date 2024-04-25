import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends ComponentProps<"button">{
  transparent?: boolean;
}

export function IconButton({transparent, ...props}: IconButtonProps){
  return(
    <button 
      {...props} 
      className={twMerge(
        "border border-black rounded-md p-1.5", 
        transparent ? "bg-blue-200" : "bg-white/10",
        props.disabled ? "opacity-50" : null
      )}
    />
  )
}