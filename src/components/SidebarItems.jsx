import styled from '@emotion/styled'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { SidebarData } from '../data/SidebarData'

export const SidebarItems = () => {
  return (
    <>
      <ul className='space-y-2 tracking-wide mt-8'>
      <Scroll>
        {SidebarData.map((item, index) => {
          return (
            <div key={index} className='relative px-4 py-3 flex items-center space-x-4 rounded-xl hover:bg-gray-300'>
              <NavLink to={item.path}>
                <li>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4'
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

  max-height: 60vh;
  overflow-y: scroll;
`;