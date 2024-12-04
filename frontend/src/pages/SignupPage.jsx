import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {Eye,EyeOff,Loader2,Lock,Mail} from "lucide-react" 
const SignupPage = () => {

    const [showPassword,setShowPassword] = useState(false)
    const [formDta,setFormDta] = useState({
      fullName: '',
      email: '',
      password: ''
    }) 

    const [signup,isSigningUp] = useAuthStore()

    const validateForm = () =>{}
    const handleSubmit = () =>{
      e.preventDefault()

    }
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
       <div className='flex flex-col justify-center'>
             
       </div>
    </div>  
  )
}

export default SignupPage