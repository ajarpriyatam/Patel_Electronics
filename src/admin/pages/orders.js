import React from 'react'
import OrderList from '../components/OrderList'

const Orders = () => {
  return (
    <div className='w-full h-full bg-gray-100 rounded-[1rem] p-[1rem] overflow-y-auto'>
      <OrderList />
    </div>
  )
}

export default Orders;
