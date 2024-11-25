import React from 'react'
import DesktopNav from './nav/DesktopNav'

type Props = React.PropsWithChildren<{}>

const SidebarWrapper = ({children}: Props) => {
  return (
    <div className='h-full w-full p-4 flex flex-col lg:flex-row g-4'>
        <DesktopNav/>
        <main className='h-[calc(100%-80px)] lg:h-full w-full gap-4 flex'>{children}</main>
    </div>
  )
}

export default SidebarWrapper