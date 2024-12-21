import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

const ValidateDocumentForm = () => {

    const [codeDocument, setCodeDocument] = useState(null)
    const [pdfUrl,setPdfUrl] = useState(null)


    const handleForm = async (e) =>{
        e.preventDefault()

        if (codeDocument) {
              try {
                //Método de supabase para ver objectos
                const { data, error } = supabase
                  .storage
                  .from("Escrituras") 
                  .getPublicUrl(`/Firmados/${codeDocument}.pdf`); 
        
                if (error || !data) {
                  console.error("Error al obtener la URL:", error);
                  setErrorMsg("No se pudo encontrar el archivo. Verifica el código.");
                } else {
                  console.log("URL obtenida:", data.publicUrl);
                  setPdfUrl(data.publicUrl); 
                }
              } catch (err) {
                console.error("Error inesperado:", err);
                setErrorMsg("Error inesperado. Inténtalo de nuevo.");
              }
            } else {
              setErrorMsg("Por favor ingresa un código válido.");
            }
    }

    return (
        <>
<div class="flex flex-col items-center justify-center h-auto space-y-6 mt-24">
  <form class="flex items-center max-w-sm w-full" onSubmit={handleForm}>
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M10 7h4" /><path d="M10 18v4l2 -1l2 1v-4" /><path d="M10 19h-2a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-2" />
        </svg>
      </div>
      <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Ingrese el código del documento" required
             onChange={(e)=>{setCodeDocument(e.target.value)}} />
    </div>
    <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
      </svg>
      <span class="sr-only">Search</span>
    </button>
  </form>

  <div class="w-[80%] h-[600px] bg-gray-200 border border-gray-300 rounded-lg shadow">
    <iframe 
      src={pdfUrl} 
      class="w-full h-full rounded-lg"
      title="Documento PDF"
    ></iframe>
  </div>
</div>



            
        </>
    )
}

export default ValidateDocumentForm
