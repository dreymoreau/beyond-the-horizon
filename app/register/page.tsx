'use client'

import Input from '@/components/input/Input'
import { useState } from 'react'

//setting types for props
interface InitialStateProps {
    name: string,
    email: string,
    password: string
}
const initialState:InitialStateProps = {
    name:"",
    email:"",
    password:""
}


export default function Page() {

    const [state, setState] = useState(initialState)
    
    function handleChange(e:any){
        // spreading out state, target to name in input field and then the value entered 
        setState({...state, [e.target.name] : e.target.value})
    }
  return (
    <form className='text-center'>
        <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
            <Input placeholder='Name' name='name' id='name' type='text' onChange={handleChange} value={state.name}/>
            <Input placeholder='Email' name='email' id='email' type='email' onChange={handleChange} value={state.email}/>
            <Input placeholder='Password' name='password' id='password' type='password' onChange={handleChange} value={state.password}/>
        </div>
    </form>
  )
}
