import styled from '@emotion/styled'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { SidebarData } from '../data/SidebarData'

export const SidebarItems = () => {
  return (
    <>
      <ul className='tracking-wide mt-6'>
      <Scroll>
        {SidebarData.map((item, index) => {
          return (
            <div key={index} className='relative px-2 py-3 flex items-center space-x-2 rounded-xl hover:bg-gray-300'>
              <NavLink to={item.path}>
                <li>
                <div className="relative px-4 py-2 flex items-center space-x-2 rounded-xl hover:bg-gray-300">
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d={item.d}
                      />
                    </svg>
                    <span className='font-medium'>{item.titulo}</span>
                    </div>
                </li>
              </NavLink>
            </div>
          )
        })}</Scroll>
      </ul>
    </>
  )
}

const Scroll = styled.div`

`;