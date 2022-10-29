import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../../actions/user';
import { DataGrid } from '@mui/x-data-grid';
import "./styles.css";

const Users = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  console.log(users);
  const [selectedIndex, setSelectedIndex] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'firstName', headerName: 'Tên', width: 150,},
    { field: 'lastName', headerName: 'Họ Đệm', width: 150 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'phoneNumber', headerName: 'Số điện thoại', width: 95 }
  ]
  const rows = users ? users?.map((user, key) => {
    return {...user, id: key}
  }) : null;

  useEffect(() => {
    dispatch(getAllUsers);
  }, [])

  return (
    <div className='user__management--container'>
      <div className='user__management--content'>
        {
          rows ?
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
          />
          :
          null
        }
      </div>
    </div>
  )
}

export default Users