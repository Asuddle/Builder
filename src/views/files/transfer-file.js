import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import FileAssignment from './file-assignment'

function TransferFile(props) {
    const dt=useSelector(item=>item.files)
    return (
        <>
            <FileAssignment hideForm={true}/>
        </>
    )
}

TransferFile.propTypes = {

}

export default TransferFile

