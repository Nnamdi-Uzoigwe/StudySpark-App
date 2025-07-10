import { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode;
}

export default function Button({ children }: ButtonProps) {
    return (
        <div className="text-white bg-[#398378] hover:bg-[#376059] focus:bg-[#376059] text-lg px-6 py-2 rounded-lg w-fit cursor-pointer">{ children }</div>
    )
}