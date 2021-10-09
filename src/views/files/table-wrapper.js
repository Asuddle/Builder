import React, { useState } from "react";
import PropTypes from "prop-types";
import FilesTable from "./table";
import EditModal from "./edit-modal";
import DeleteFileModal from "./delete-modal";
function TableWrapper(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState({});
  const handleEdit = (data) => {
    if(isEdit===true){
      setData({})
    }else{
      setData(data);
    
    }
    setIsEdit(!isEdit);
  };
  const handleDelete = (data) => {
    setDeleteModal(!deleteModal);
  };
  
  return (
    <div>
      <FilesTable isEdit={handleEdit} isDelete={handleDelete} />
      <EditModal open={isEdit} handleClose={handleEdit} data={data} />
      <DeleteFileModal open={deleteModal} handleClose={handleDelete} />
    </div>
  );
}

TableWrapper.propTypes = {};

export default TableWrapper;
