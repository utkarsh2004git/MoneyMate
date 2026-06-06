import { Box, PencilIcon } from 'lucide-react'
import React from 'react'

const CategoryList = ({categories, onEditCategory}) => {
  return (
    <div className='card p-4'>

    <div className='flex items-center justify-between mb-4'>
      <h4 className='text-lg font-semibold'>
        Category Sources
      </h4>
    </div>
      {/* Category List  */}
      {categories.length === 0?(
          <p className='text-gray-500'>
            No categories added yet. Add some to get started.
        </p>
      ):(
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {categories.map((c) =>(
                <div 
                key={c.id}
                className='group relative flex items-center gap-4 p-3 rounded-lg hover:bg-blue-100/50 cursor-pointer'>
                    {/* Icon/Emoji display  */}
                    <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-blue-100/50 rounded-full'>
                        {c.icon ? (<span className='text-xl'>
                            <img src={c.icon} alt={c.name} className='h-8 w-8' />
                        </span>):(
                            <Box className='text-blue-800' size={24}/>
                        )}
                    </div>
                    {/* Category details */}
                    <div className='flex-1 flex items-center justify-between'>
                        {/* Category Name and Type */}
                        <div>
                            <p className='text-md text-blue-700 font-medium'>
                                {c.name}
                            </p>
                            <p className='text-sm text-gray-400 mt-1 capitalize'>
                                {c.type}
                            </p>
                        </div>
                        {/* Action buttons */}
                        <div className='flex items-center gap-2'>
                            <button onClick={()=>onEditCategory(c)} className='text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'>
                                <PencilIcon size={18}/>
                            </button>

                        </div>
                    </div>


                </div>
            ))}
        </div>
      )
    }

    </div>
  )
}

export default CategoryList
