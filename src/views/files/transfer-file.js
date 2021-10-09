import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

function TransferFile(props) {
    const dt=useSelector(item=>item.files)
    return (
        <div>
            
        </div>
    )
}

TransferFile.propTypes = {

}

export default TransferFile

