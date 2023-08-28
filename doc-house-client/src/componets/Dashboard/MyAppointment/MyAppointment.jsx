import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Appcard from './Appcard';
import { axiosinstance } from '../../Shared/Instance/Instance';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Authentication/firebase/firebase';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const MyAppointment = () => {
    const [date, setdate] = useState(null)
    const [appdata, setappdata] = useState([])
    const [user] = useAuthState(auth)
    const [totalcount,settotalcount]=useState(null)
    const [currentpage,setcurrentpage]=useState(1)
    // how use date
    useEffect(() => {
        const fromdate = new Date()
        setdate(format(fromdate, 'PPP'))
    }, [date])
    // Data loaded
    useEffect(() => {
        const getdata = async () => {
            const { data } = await axiosinstance.get(`/appointmentget?email=${user?.email}&page=${currentpage}`)
            setappdata(data)
        }
        getdata()
    }, [user,currentpage])
    // appointments all data 
    // const totalpages=Math.ceil(totalcount/10)
    useEffect(()=>{
        const gettotal=async()=>{
            const {data}=await axiosinstance.get(`/appointmentotalcount?email=${user?.email}`)
            settotalcount(data)
        }
        gettotal()
    },[])
    // console.log()
    return (
        <div>
            <div className='flex justify-between my-3 items-center'>
                <h1 className='text-xl lg:text-2xl font-semibold'>My Appointment</h1>
                <h1 className='border border-[#3d86b0] p-1 rounded-md'>{date}</h1>
            </div>
            {/* table start for websites */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-base lg:text-xl'>
                            <th>Scrial</th>
                            <th>Name</th>
                            <th>Time</th>
                            <th>Gmail</th>
                            <th>Date</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 3 */}
                        {appdata.map((app, index) => <Appcard index={index} key={app._id} appdata={app}></Appcard>)}
                       
                    </tbody>
                </table>
                 {/* paginations for my websites */}
                <div className="join flex justify-center my-10">
                    <button onClick={() => currentpage === 1 ? setcurrentpage(1) : setcurrentpage(currentpage - 1)} disabled={currentpage === 1} className="join-item btn">«</button>
                    <button className="join-item btn capitalize">Page-{currentpage}</button>
                    <button onClick={() => {currentpage === Math.ceil(totalcount?.result / 10) ? setcurrentpage(Math.ceil(totalcount?.result / limit)) : setcurrentpage(currentpage + 1)
                    }} disabled={currentpage === Math.ceil(totalcount?.result / 10)} className="join-item btn">»</button>
                </div>
            </div>
        </div>
    );
};

export default MyAppointment;