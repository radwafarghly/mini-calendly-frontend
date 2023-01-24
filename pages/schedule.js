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

export default function Schedule() {
    const router = useRouter()
    const [schedules, setSchedules] = useState([])
    const [errors, setErrors] = useState([])
    const [days, setDays] = useState([])
    const [reGetSchedules, setReGetSchedules] = useState(false)
    const [name, setScheduleName] = useState('')
    const [allDays, setAllDays] = useState([])
    const [selectSchedule,SetSelectSchedule]= useState(null)
    const [showAddModal, SetShowAddModal]=useState(false)
    // to get all  Schedule
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

    // Delete on day of Schedule
    async function deleteDay(dayId,scheduleId) {
        try{
         const reponse= await axios.post('/api/schedule/delete/day/'+ scheduleId,{day_id : dayId},
            {
                headers: { 'Content-Type': 'application/json' ,
                           'Accept':'application/json' ,
                           'Authorization': `Bearer ${localStorage.getItem('access_token')}`   
                },
                withCredentials: true
            }
            )

            setReGetSchedules(!reGetSchedules)
        //   const index= schedules.findIndex(schedule=> {
        //     return schedule.id === reponse.data.data.id
        //    })
        //    schedules[index] = reponse.data.data
        //    setSchedules(schedules)

        //    console.log(schedules)

    } catch (err) {
        if (!err?.response) {
            setErrors(Object.values('No Server Response').flat())
        }else if (err.response?.status === 401) {
            router.push('login')
            setErrors(Object.values('Unauthorized').flat())

        }
    }   
      
       
        // location.reload()
    } 
    // save the Schedule
    const submitForm = async event => {
        event.preventDefault()
        const user_id = localStorage.getItem('userId')
        try {
            const response = await axios.post('api/schedule',
                { name, user_id},
                {
                    headers: { 'Content-Type': 'application/json' ,
                               'Accept':'application/json' ,
                               'Authorization': `Bearer ${localStorage.getItem('access_token')}`   

                    },
                    withCredentials: true
                }
            );
            setReGetSchedules(!reGetSchedules)
        } catch (err) {
            if (!err?.response) {
                setErrors(Object.values('No Server Response').flat())
            }else if (err.response?.status === 401) {
                router.push('login')
                setErrors(Object.values('Unauthorized').flat())

            }
        }   
    }

     // get all days 
     const getDays = async () => {
        try{
            const respons = await axios.get('/api/day',{
                headers: { 'Content-Type': 'application/json' ,
                           'Accept':'application/json' ,
                },
                withCredentials: true
            });
            setAllDays(respons.data.data)

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
        getSchedules()
        getDays()
    },[reGetSchedules]) 

    function toggleModal() {
        document.getElementById('modal').classList.toggle('hidden')
    }
    
    function toggleAddModal(schedule) {
        SetSelectSchedule(schedule)
        SetShowAddModal(true)
        if(document.getElementById('modal2') && !document.getElementById('modal2').classList.contains('hidden') ){
            SetShowAddModal(false)
            SetSelectSchedule(null)
        }
        document.getElementById('modal2')&&document.getElementById('modal2').classList.toggle('hidden')
    }

    return (
        <> 
            <Navbar/>
            <Head>
                <title>Schedule</title>
            </Head>
           
            <div className={"mt-16 w-1/2 mx-auto bg-white p-5 pt-8 rounded-lg border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"}>
                <div className="text-2xl font-bold text-right p-2" > 
                     <Button className="ml-3" onClick={()=>toggleModal()}>Add New Schedule </Button>
                     <AddSchduleModal  onToggleModal={toggleModal} />
                     <hr></hr>

                </div>
                <Errors className="mb-5" errors={errors} />
                {schedules.map((schedule, index) => (
                    <>

                    <div key={schedule.id+"schedule"} className={`${index + 1 == schedules.length ? '' : 'pb-10 mb-10 border-b'}`}>
                        {/* <div className="w-1/3 h-56 relative overflow-hidden rounded-lg">
                            <img src={schedule.images[0].path} className="object-cover w-full h-full"></img>
                        </div> */}

                        <div className="w-full pl-14">
                            <div className="justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">{schedule.name}</h1>   
                                <Button className="text-2xl font-bold text-right" onClick={()=>toggleAddModal(schedule)}>Add Day to Schedule </Button>    
                                
                  
                            </div>
                            <Card key={schedule.id+"card"} days={schedule.days} schedule={schedule} onDeleteDay={deleteDay} />
                        </div>
                    </div>
                                  
                    </>



                ))}
            </div>

            {
                allDays.length > 0 &&
                <AddDaySchduleModal  onToggleModal={toggleAddModal} schedule={selectSchedule} days={allDays}/>
            }     
        </>
    )
}