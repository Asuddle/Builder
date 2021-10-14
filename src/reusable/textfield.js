import React from 'react'
import PropTypes from 'prop-types'
import { CFormGroup, CInput, CInvalidFeedback, CLabel } from '@coreui/react'

function TextFieldComponent({touched,handleChange,error,name,value,label,required=false,placeholder=false,type='text'}) {
    return (
        <>
            <CFormGroup>
                    <CLabel htmlFor="company">
                      {label}{' '}{required&&<span className="sterick-field">*</span>}{" "}
                    </CLabel>
                    <CInput
                      invalid={touched&& error}
                      name={name}
                      type={type}
                      value={value}
                      onChange={handleChange}
                      placeholder={placeholder?placeholder:label}
                    />

                    {touched && error && (
                      <CInvalidFeedback>{error}</CInvalidFeedback>
                    )}
                  </CFormGroup>
        </>
    )
}


TextFieldComponent.propTypes = {

}

export default TextFieldComponent

