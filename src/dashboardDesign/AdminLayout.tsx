import { Outlet } from 'react-router-dom'
import Card from './Card'
import { AdminSideNav } from './AdminSidenav'


export const  AdminLayout =() =>{
    return (
       <div className='flex h-screen w-screen bg-gradient-to-br from-white to-purple-50'>
      <div className='w-[12%] flex-shrink-0'>
                <AdminSideNav />
            </div>
            <div className='flex flex-col min-w-[80%] '>
                <div className="h-fit">
                    <Card>
                        <Outlet />
                    </Card>
                </div>
            </div>
        </div>
    )
}