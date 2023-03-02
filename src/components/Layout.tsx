import React, { FC} from 'react';
import Navbar from './Navbar';

interface Props {
  children: React.ReactNode;
}


const Layout: FC<Props> = ({children}) => {
  return (
    <div className='w-full h-full flex flex-col overflow-auto'>
      <Navbar />
        <div className="h-full w-full bg-zinc-900 bg-[url('../assets/layered-waves-haikei.svg')] bg-center bg-cover bg-no-repeat">
          {children}
        </div>
    </div>
  )
}

export default Layout