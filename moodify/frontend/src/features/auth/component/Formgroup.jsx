import React from 'react'

const Formgroup = ({label , placeholder  , value  , onchange}) => {
  return (
    <div className="input-group">
      <label htmlFor={label.toLowerCase()}>{label} : </label>
      <input 
      value={value}
        type="text" 
        onChange = {onchange}
        id={label.toLowerCase()} 
        name={label.toLowerCase()} 
        placeholder={placeholder} 
      />
    </div>
  )
}

export default Formgroup