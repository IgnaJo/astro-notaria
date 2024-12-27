import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { toast, ToastContainer } from 'react-toastify'

const ValidateDocumentForm = () => {

  const [codeDocument, setCodeDocument] = useState('')
  const [pdfUrl, setPdfUrl] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)



  const toastConfig = {
    position: 'bottom-center'
  }


  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    if (!codeDocument) {
      setErrorMsg();
      toast.error(errorMsg);

      return;
    }

    try {
      const { data: files, error: listError } = await supabase
        .storage
        .from("Escrituras")
        .list('Firmados', {

          search: `${codeDocument}.pdf`
        })


      if (listError) {
        setErrorMsg("Error en la busqueda en el servidor")
        toast.error(errorMsg)
        setIsLoading(false)
        return;
      }



      if (files.length === 0) {
        setErrorMsg("Documento no encontrado, verifique el código")
        toast.error(errorMsg)
        setIsLoading(false)

      } else {
        const { data } = supabase
          .storage
          .from("Escrituras")
          .getPublicUrl(`Firmados/${codeDocument}.pdf`)
        const documentURL = data.publicUrl
        setPdfUrl(documentURL)
        setIsLoading(false)


      }

    } catch (error) {
      setErrorMsg('Error inesperado en la operación', error);
      toast.error(errorMsg)
      setIsLoading(false)


    }




  };
  return (
    <>


      <div class="flex flex-col items-center justify-center h-auto space-y-6 p-5">
        <h5 class=" text-3xl font-extrabold dark:text-primary">Validación de Documentos</h5>
        <form class="flex items-centr max-w-sm w-full" onSubmit={handleForm}>
          <label for="simple-search" class="sr-only">Search</label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M10 7h4" /><path d="M10 18v4l2 -1l2 1v-4" /><path d="M10 19h-2a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-2" />
              </svg>
            </div>
            <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ingrese el código del documento" required
              onChange={(e) => { setCodeDocument(e.target.value) }} />
          </div>
          <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-lightGreen rounded-lg border border-gray-700 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-gray-300 ">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </form>
        <ToastContainer></ToastContainer>







        <div class="relative items-center w-[80%] h-[600px] bg-gray-200 border border-gray-300 rounded-lg shadow ">
          {
            isLoading ?
              <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 transition-opacity duration-1000 ease-out opacity-100 ">
                <svg aria-hidden="true" class="w-20 h-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                <span class="sr-only">Loading...</span>
              </div>


              :
              !isLoading && pdfUrl !== '' ?

                <iframe
                  src={pdfUrl}
                  class="w-full h-full rounded-lg"
                  title="Documento PDF"

                >


                </iframe>



                : <></>
          }
        </div>








      </div>




    </>
  )
}

export default ValidateDocumentForm
