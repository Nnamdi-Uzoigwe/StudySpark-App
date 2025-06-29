import { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode;
}

export default function Button({ children }: ButtonProps) {
    return (
        <div className="text-white bg-[#398378] px-6 py-2 rounded-lg w-fit">{ children }</div>
    )
}