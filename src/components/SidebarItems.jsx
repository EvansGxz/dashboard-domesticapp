import React from 'react'
import { NavLink } from 'react-router-dom'
import { SidebarData } from '../data/SidebarData'

export const SidebarItems = () => {
  return (
    <>
      <ul class='space-y-2 tracking-wide mt-8'>
        {SidebarData.map((item, index) => {
          return (
            <div key={index}>
              <NavLink to={item.path}>
                <li>
                  <a
                    href='/#'
                    aria-label={item.titulo}
                    class='relative px-4 py-3 flex items-center space-x-4 rounded-xl hover:bg-gray-300'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      class='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      stroke-width='2'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d={item.d}
                      />
                    </svg>
                    <span class='-mr-1 font-medium'>{item.titulo}</span>
                  </a>
                </li>
              </NavLink>
            </div>
          )
        })}
      </ul>
    </>
  )
}
