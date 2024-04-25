import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableCellProps extends ComponentProps<"td">{}

export function TableCell({className, ...props}: TableCellProps){
  return(
    <td
      {...props}
      className={twMerge("py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base", className)}
    />
  )
}
