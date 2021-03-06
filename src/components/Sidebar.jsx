import { SidebarItems } from './SidebarItems'
import Logo2 from '../img/Logo2.png'
import { useAuth } from '../context/auth-context'
import styled from '@emotion/styled';

export const Sidebar = () => {
  
  let atts = ""
  const {user, logout} = useAuth();
  function out(){
    logout();
  }
  if(window.screen.width < 810){
    atts='lg:hidden burgerHide'
  }else{
    atts= 'h-100 fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-gradient-to-b from-blue-100 to-rose-100 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'
  }
 
  return (
    <>
      <aside 
      className={atts}>
        {/* datos */}
        <div>
            <ul className="space-y-2 tracking-wide mt-8">
              <li>
                <div className='relative px py flex items-center space-x-4 rounded-xl text-black'>
                  <img src={Logo2} className='w-14' alt='tailus logo' />
                  <span className='text-md'>DOMESTICAPP</span>
                </div>
              </li>
            </ul>
          <div className='mt-4 mr-3 text-center'>
            <img
              src={user.image_url}
              alt=''
              className='w-10 h-10 m-auto rounded-full object-cover w-20 h-20'
            />
            <h5 className=' mt-4 text-xl font-semibold text-gray-600 lg:block'>
              {user.nickname}
            </h5>
            <span className=' text-gray-400 lg:block'>{user.role}</span>
          </div>
        </div>
        <Container>
        {/* menu */}
        <SidebarItems></SidebarItems>
        {/* logout */}
        <div className='px-6 -mx-6 pt-4 flex justify-between items-center border-t'>
          <button 
          onClick={out}
          className='px-4 py-3 flex items-center space-x-4 rounded-full text-gray-600 group hover:bg-gray-300'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
              />
            </svg>
            <span className='group-hover:text-gray-700'>Logout</span>
          </button>
        </div>
        </Container>
      </aside>
    </>
  )
}

const Container = styled.div`
  overflow-y: scroll;
`;
