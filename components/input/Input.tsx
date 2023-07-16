
//converting to client component
'use client'

// defining all the types
interface InputProps {
    type: any,
    value: any,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string
    id:string
    placeholder?: string
    big?: boolean 
}

export default function Input({type, value, onChange, name, id, placeholder, big}: InputProps) {
  return (
    <input type={type} value={value} onChange={onChange} name={name} id={id} placeholder={placeholder} 
    // classes for tailwind
    className={`
        w-full
        p-4
        pt-6
        font-light
        bg-white
        border-2
        outline-none
        text-black
        // big is for the size of the screen
        ${big ? 'w-[400px] pb-[6rem]' : ""}
    `}/>
  )
}
