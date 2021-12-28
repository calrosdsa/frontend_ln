import React from 'react'

import useSWR from 'swr'
import axios from 'axios'

export const fetcher = url => axios.get(url).then(res => res.data)
function Posts() {
  const {data} = useSWR('/api/', fetcher)
  return (
    <div className='bg-gray-800 pt-40 h-screen'>
      {data?.map(item=>(
        <div>{item.id}sss</div>
      ))}
      sasas
    </div>
  )
}

export default Posts
