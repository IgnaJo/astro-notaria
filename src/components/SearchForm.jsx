import React, { useRef, useState } from "react";
import { supabase } from "../lib/supabase"; 

const SearchForm = () => {
  const [codeDocument, setCodeDocument] = useState(""); 
  const [pdfUrl, setPdfUrl] = useState(""); 
  const [errorMsg, setErrorMsg] = useState(""); // Estado para manejar errores.
  const inputRef = useRef(null);

  // Manejador del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página.
    setErrorMsg(""); // Reinicia el estado de error.

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
          setPdfUrl(data.publicUrl); // Guarda la URL del PDF en el estado.
        }
      } catch (err) {
        console.error("Error inesperado:", err);
        setErrorMsg("Error inesperado. Inténtalo de nuevo.");
      }
    } else {
      setErrorMsg("Por favor ingresa un código válido.");
    }
  };

  return (
    <>
      {/* Formulario */}
        <div className="w-full max-w-sm min-w-[200px] pt-20 mt-20 content-center">
      <form id="searchForm" name="searchForm" onSubmit={handleSubmit}>
          <div className="relative flex ">
            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Código de documento"
              id="code-input"
              ref={inputRef}
              onChange={(e) => setCodeDocument(e.target.value)} 
              value={codeDocument} // Sincroniza con el estado
            />
            <button
              className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 ml-2"
              type="submit"
            >
              Buscar
            </button>
          </div>
          {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
      </form>
        </div>

<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto mt-10"></div>
      {/* Iframe para mostrar el PDF */}
      {pdfUrl && (
        <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto mt-10 align-middle">
          <h3 className="text-lg font-semibold mb-4">Documento PDF:</h3>
          <iframe
            src={pdfUrl}
            title="Documento"
            width="80%"
            height="600px"
            className="border border-gray-300 rounded-lg shadow"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default SearchForm;
