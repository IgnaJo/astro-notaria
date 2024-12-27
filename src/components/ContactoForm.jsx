

import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { toast, ToastContainer } from 'react-toastify'



const ContactoForm = () => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [subject,setSubject] = useState('')
    const [message,setMessage] = useState('')

    const cleanForm = () =>{
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
    }

    const handleForm = async (e) =>{
        e.preventDefault()
        console.log(name)

        try {
            const { error } = await supabase
            .from('contact')
            .insert({  
              name: name,
              email: email,
              subject: subject,
              message: message
              })
              toast.success('Mensaje enviado correctamente, pronto nos pondremos en contacto',{position:'bottom-center'})
              cleanForm()
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }

     
    }



  return (
    <>
    <div class="container px-5 py-24 mx-auto flex">
      <div class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
      <form onSubmit={handleForm}>
        <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Contacto</h2>
        <p class="leading-relaxed mb-5 text-gray-600">Escríbanos y déjenos sus consultas a través del formulario. Revisaremos su inquetud y le responderemos a la brevedad posible</p>
        <div class="relative mb-4">
          <label for="name" class="leading-7 text-sm text-gray-600">Nombre</label>
          <input type="text" id="name" name="name" onChange={(e)=>{setName(e.target.value)}} value={name} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
        </div>
        <div class="relative mb-4">
          <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
          <input type="email" id="email" name="email" onChange={(e) => {setEmail(e.target.value)}} value={email} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
        </div>
        <div class="relative mb-4">
          <label for="subject" class="leading-7 text-sm text-gray-600">Asunto</label>
          <input type="text" id="subject" name="subject" onChange={(e)=>{setSubject(e.target.value)}} value={subject} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
        </div>
        <div class="relative mb-4">
          <label for="message" class="leading-7 text-sm text-gray-600">Mensaje</label>
          <textarea id="message" name="message" onChange={(e)=>{setMessage(e.target.value)}} value={message} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" required></textarea>
        <ToastContainer />
        </div>
        <button type='submit' class="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Enviar</button>
        <p class="text-xs text-gray-500 mt-3">Nos pondremos en contacto a la brevedad.</p>
        </form>
      </div>
    </div>
   
    </>
  )
}

export default ContactoForm
