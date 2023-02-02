import { useEffect, useState } from 'react'
import { getAllPayments } from '../../../api'
import { MdSearchOff } from 'react-icons/md'
import { Typography } from '@mui/material'

const Dashboard = () => {
  const [payments, setPayments] = useState([])

  const getPayments = async () => {
    const res = await getAllPayments()

    if (res.status === 200) {
      setPayments(res.data.result)
    }
  }

  useEffect(() => {
    getPayments()
  }, [])

  return !payments?.length ? (
    <div className="not__found-container">
      <MdSearchOff size="240px" />
      <Typography fontSize={36}>No payments are found</Typography>
    </div>
  ) : (
    <>
      <div className="blogs__management-list">
        {payments?.map((payment) => (
          <div>{payment._id}</div>
        ))}
      </div>
    </>
  )
}

export default Dashboard
