import React from 'react'
import DownSetting from './DownSetting';
import MountSetting from './MountSetting';

const AdminPage1 = () => {
    return (
        <div className='flex flex-col md:flex-row gap-4'>
            <section className=' w-full  shadow-md border border-gray-200 rounded-md px-4 py-4'>
                <DownSetting />
            </section>

            <section className=' w-full  shadow-md border border-gray-200 rounded-md px-4 py-4 items-end  '>
                <MountSetting />
            </section>

        </div>
    )
}

export default AdminPage1