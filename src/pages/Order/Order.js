import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { getAllOrdersByUser } from '../../actions/order';
import './styles.css'

const Order = () => {

    const orders = useSelector(state => state.order.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrdersByUser());
    }, [])

    return (
        <div className='order__history-container'>
            <div className='order__history-card'>
                <div className='order__history-label'>
                    <p>Order History</p>
                </div>
                {orders.map((order, index) => {
                    return (
                        <div key={index}>
                            <div className='order__history-item'>
                                <div className='order__history-info-column'>
                                    <div className='order__history-info__item'>
                                        <p className='order__history-subtitle'>{order?._id}</p>
                                        <p className='order__history-title'>{order?.productId?.name}</p>
                                    </div>
                                    <div className='order__history-info__item'>
                                        <p className='order__history-subtitle'>Purchased Date</p>
                                        <p className='order__history-title'>{order?.productId?.createdAt?.substring(0, order?.productId?.createdAt?.indexOf('T'))}</p>
                                    </div>
                                </div>
                                <div className='order__history-info-right'>
                                    <div className='order__history-info-column'>
                                        <div className='order__history-info__item'>
                                            <p className='order__history-subtitle'>Purchased</p>
                                            <p className='order__history-title'>{order?.paid} VND</p>
                                        </div>
                                        <div className='order__history-info__item'>
                                            <p className='order__history-subtitle'>Cost</p>
                                            <p className='order__history-title'>{order?.productId?.price} VND</p>
                                        </div>
                                    </div>
                                    <div className='order__history-info-column'>
                                        <div className='order__history-info-price'>
                                            <div className='order__history-info__item'>
                                                <p className='order__history-subtitle'>Quantity</p>
                                                <p className='order__history-title'>{parseInt(order?.amount) / parseInt(order?.productId?.price)}</p>
                                            </div>
                                            <div className='order__history-info__item'>
                                                <p className='order__history-subtitle'>Total</p>
                                                <p className='order__history-title'>{order?.amount} VND</p>
                                            </div>
                                        </div>
                                        <div className='order__history-info-payment'>
                                            <div className='order__history-info__item'>
                                                <p className='order__history-subtitle'>Status</p>
                                                <p className='order__history-title'>{order?.status ? "Completed" : "Not complete"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Order