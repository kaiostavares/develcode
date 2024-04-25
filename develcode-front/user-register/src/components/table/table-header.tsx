import { ComponentProps } from "react";

interface TableHeaderProps extends ComponentProps<"th">{}

export function TableHeader(props:TableHeaderProps){
  return(
    <th className="py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base font-semibold text-left" {...props} />
  );
}
