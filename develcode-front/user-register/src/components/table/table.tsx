import { ComponentProps } from "react";

interface TableProps extends ComponentProps<"table">{}

export function Table(props:TableProps){
  return(
    <div className="border border-black rounded-lg">
        <table className="w-full" {...props}/>
    </div>
  )
}