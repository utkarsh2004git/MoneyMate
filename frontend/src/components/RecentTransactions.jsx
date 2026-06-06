import { ArrowRight } from 'lucide-react'
import React from 'react'
import TransactionalInfoCard from './TransactionalInfoCard'
import moment from 'moment'

const RecentTransactions = ({transactions, onMore}) => {
  return (
    <div className='bg-white p-4 rounded-lg shadow'>
        <div className='flex items-center justify-between'>
            <h4 className='text-lg '>
                Recent Transactions
            </h4>
            <button className='flex gap-2 justify-center items-center px-2 py-1 bg-blue-500 hover:bg-blue-600 duration-200 text-white rounded-md  cursor-pointer' onClick={onMore}>
                More <ArrowRight className='text-base' size={15}/>
            </button>
        </div>
        <div className='mt-6'>
            {transactions?.slice(0,5)?.map((t)=>(
                <TransactionalInfoCard 
                key={t.id}
                title={t.name}
                icon={t.icon}
                date={moment(t.date).format("Do MMM YYYY")}
                amount={t.amount}
                type={t.type}
                hideDeleteBtn={true}
                />
            )) }
        </div>
    </div>
  )
}

export default RecentTransactions
