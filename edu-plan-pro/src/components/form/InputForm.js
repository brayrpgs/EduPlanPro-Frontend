import React from 'react'


{/* formulario Generico, se pasa el tipo de input, nombre, etc */}
const InputForm = ({ValueInput, setValueInput, typeInput, nameInput, label, placeholder}) => {
  return (
      <div className="mb-3">
          <label htmlFor={nameInput} className="form-label">{label}</label>
          <input value={ValueInput} onChange={(e)=>setValueInput(e)} type={typeInput} name={nameInput} className="form-control" id={nameInput} placeholder={placeholder} />
      </div>
  )
}

export default InputForm