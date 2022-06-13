import { SidebarItems } from './SidebarItems'
import User from '../img/User.png'
import Logo2 from '../img/Logo2.png'
import { useAuth } from '../context/auth-context'

export const Sidebar = () => {
  const {user} = useAuth();
  return (
    <>
      <aside className='ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-gradient-to-b from-blue-100 to-rose-100 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
        <div></div>
        {/* datos */}
        <div>
          <div class='-mx-6 px-6 py-1'>
            <ul class='space-y-1 tracking-wide mt-8'>
              <li>
                <div class='relative px py flex items-center space-x-4 rounded-xl text-black'>
                  <img src={Logo2} class='w-16' alt='tailus logo' />
                  <span class='-mr-1 font-medium text-xl'>DOMESTICAPP</span>
                </div>
              </li>
            </ul>
          </div>
          <div class='mt-4 mr-3 text-center'>
            <img
              src={User}
              alt=''
              class='w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28'
            />
            <h5 class='hidden mt-4 text-xl font-semibold text-gray-600 lg:block'>
              {user.nickname}
            </h5>
            <span class='hidden text-gray-400 lg:block'>{user.role}</span>
          </div>
        </div>
        {/* menu */}
        <SidebarItems></SidebarItems>
        {/* logout */}
        <div class='px-6 -mx-6 pt-4 flex justify-between items-center border-t'>
          <button class='px-4 py-3 flex items-center space-x-4 rounded-full text-gray-600 group hover:bg-gray-300'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              class='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
              />
            </svg>
            <span class='group-hover:text-gray-700'>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
