import { Link } from 'react-router-dom'


export const EditarEmpleado = () => {


  return (
    <>
      <div className='ml-auto mb-6 mt-6 lg:w-[100%] xl:w-[100%] 2xl:w-[100%]'>
        {/* Navegador */}
        <div className='sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5'>
          <div className='px-6 flex items-center justify-between space-x-4 2xl:container'>
            <Link to={'/'}>
              <a
                href='/#'
                aria-label='return'
                className='w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 ml-1.5 mt-1.5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6'
                  />
                </svg>
              </a>
            </Link>
            <h5 hidden className='text-2xl text-gray-600 font-left lg:block'>
              Editar Empleado
            </h5>
          </div>
        </div>
      </div>
      {/* Form  */}
      <div className='max-w-2xl mx-auto bg-white p-8 lg:w-[100%]'>
        <form>
          <div className='grid gap-6 mb-6 lg:grid-cols-2'>
            <div>
              <label
                for='e_nombre'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Nombre Completo
              </label>
              <input
                type='text'
                id='e_nombre'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                placeholder=''
                required
              />
            </div>
            <div>
              <label
                for='e_n_documento'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                #Documento
              </label>
              <input
                type='text'
                id='e_n_documento'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                placeholder=''
                required
              />
            </div>
            <div>
              <label
                for='e_pais'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Pais
              </label>
              <input
                type='text'
                id='e_pais'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                placeholder=''
                required
              />
            </div>
            <div>
              <label
                for='e_telefono'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Región
              </label>
              <input
                type='text'
                id='e_telefono'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                placeholder=''
                pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
                required
              />
            </div>
            <div>
              <label
                for='e_fecha_ingreso'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Fecha De Ingreso
              </label>
              <input
                type='text'
                id='e_fecha_ingreso'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                placeholder=''
                required
              />
            </div>
            <div>
              <label
                for='e_n_movil'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Numero Movil
              </label>
              <input
                type='number'
                id='e_n_movil'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                placeholder=''
                required
              />
            </div>
            <div>
              <label
                for='e_email'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Email
              </label>
              <input
                type='email'
                id='e_email'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                placeholder=''
                required
              />
            </div>
            <div>
              <label
                for='e_labores'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Labores Y Oficios
              </label>
              <input
                type='text'
                id='e_labores'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                placeholder=''
                required
              />
            </div>
            <div>
              <label
                for='e_aptitudes'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Aptitudes
              </label>
              <input
                type='text'
                id='e_aptitudes'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                placeholder=''
                required
              />
            </div>
            <div>
              <label
                for='e_experiencia'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Experiencia (Años)
              </label>
              <input
                type='number'
                id='e_experiencia'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                placeholder=''
                required
              />
            </div>
          </div>
          <br />
          <div className='grid gap-6 mb-6'>
            <div>
              <label for='myfile'>Foto de perfil: </label>
              &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
              <input type='file' id='myfile' name='myfile' />
            </div>
            <div>
              <label for='myfile'>Contrato: </label>
              &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
              <input type='file' id='myfile' name='myfile' />
            </div>
          </div>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            Ingresar
          </button>
        </form>
      </div>
    </>
  )
}
