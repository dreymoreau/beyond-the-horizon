'use client'

import Input from '@/components/input/Input'
import { FormEvent, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

//setting types for props
interface InitialStateProps {
    email: string,
    password: string
}
const initialState:InitialStateProps = {
    email:"",
    password:""
}


export default function Page() {

    const [state, setState] = useState(initialState)
    const router = useRouter()
    
    function handleChange(e:any){
        // spreading out state, target to name in input field and then the value entered 
        setState({...state, [e.target.name] : e.target.value})
    }

    //event:FormEvent helps handle the forms
    const onSubmit = (event:FormEvent) => {
        // prevents page refresh when submitting form
        event.preventDefault()
        
        signIn('credentials', {
            ...state,
            redirect: false
        })
        .then((callback) => {
            // if successful, refresh page, when a blog or user is created, page needs to be refreshed for result (GET request) if not will see old state
            if(callback?.ok){
                router.refresh()
            }

            if(callback?.error) {
                throw new Error('Wrong Credentials')
            }
        })
        router.push('/')
    }
  return (
    <form className='text-center' onSubmit={onSubmit}>
        <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
            <Input placeholder='Email' name='email' id='email' type='email' onChange={handleChange} value={state.email}/>
            <Input placeholder='Password' name='password' id='password' type='password' onChange={handleChange} value={state.password}/>
            <button type="submit"></button>
        </div>

        <div>
            <div>Have you created an account yet? <Link href='/register'>Register</Link></div>
        </div>
    </form>
  )
}