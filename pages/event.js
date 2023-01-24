import Head from 'next/head'
import Link from 'next/link'
import Label from '../components/label'
import Input from '../components/input'
import axios from '../plugins/axios'
import Errors from '../components/errors'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import Card from '../components/card'
import Button from '../components/button'
import AddSchduleModal from '../components/addSchduleModal'
import AddDaySchduleModal from '../components/addDayModal'
import AddEventModal from '../components/addEventModal'

export default function Event() {
    const router = useRouter()
    const [events, setEvents] = useState([])
    const [errors, setErrors] = useState([])
    const [schedules, setSchedules] = useState([])
    const [selectSchedule,SetSelectSchedule]= useState(null)
    // to get all  Event of auth user
    const getEvent = async () => {
        const  access_token  = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;
       
        try{
            const respons = await axios.get('/api/event',{
                headers: { 'Content-Type': 'application/json' ,
                           'Accept':'application/json' ,
                           'Authorization': `Bearer ${access_token}`   
                },
                withCredentials: true
            });
            setEvents(respons.data.data)

        } catch (err) {
            if (!err?.response) {
                setErrors(Object.values('No Server Response').flat())
            }else if (err.response?.status === 401) {
                router.push('login')
                setErrors(Object.values('Unauthorized').flat())

            }
        }   
        

    }

     // to get all  Schedule of auth user
     const getSchedules = async () => {
        const  access_token  = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;
       
        try{
            const respons = await axios.get('/api/schedule',{
                headers: { 'Content-Type': 'application/json' ,
                           'Accept':'application/json' ,
                           'Authorization': `Bearer ${access_token}`   
                },
                withCredentials: true
            });
            setSchedules(respons.data.data)

        } catch (err) {
            if (!err?.response) {
                setErrors(Object.values('No Server Response').flat())
            }else if (err.response?.status === 401) {
                router.push('login')
                setErrors(Object.values('Unauthorized').flat())

            }
        }   
    }
    

    useEffect(()=>{
        getEvent()
        getSchedules()
    },[]) 

    function toggleModal() {
        document.getElementById('modal').classList.toggle('hidden')
    }
    
    return (
        <> 
            <Navbar/>
            <Head>
                <title>Event</title>
            </Head>
           
            <div className={"mt-16 w-1/2 mx-auto bg-white p-5 pt-8 rounded-lg border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"}>
                <div className="text-2xl font-bold text-right p-2" > 
                     <Button className="ml-3" onClick={()=>toggleModal()}>Add New Event</Button>
                     <AddEventModal  onToggleModal={toggleModal} schedules={schedules} />
                     <hr></hr>

                </div>
                <Errors className="mb-5" errors={errors} />
                {events.map((event, index) => (
                    <>

                    <div key={event.id+"schedule"} className={`${index + 1 == events.length ? '' : 'pb-10 mb-10 border-b'}`}>
                        <div className="w-full pl-14">
                            <div className="justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">{event.name}</h1>   
                                <p class="text-gray-700 text-base">
                                  {event.description}
                                </p>
                                <span>{event.duration}</span>

                            </div>
                        </div>
                    </div>
                                  
                    </>



                ))}
            </div>
        </>
    )
}