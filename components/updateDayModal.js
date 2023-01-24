import Label from './label'
import Input from './input'

import { useState,useEffect } from 'react'
import Button from './button'
import Error from './errors'
import axios from '../plugins/axios'

import { useRouter } from 'next/router'

export default function updateDayModal({showUpdate,onToggleModal,schedule,day}) {   
    const router = useRouter()

    const [time_from,setTimeFrom] = useState('')
    const [time_to,setTimeTo] = useState('')
    const [errors, setErrors] = useState([])
    const [day_id, setDay] = useState('')
    const [day_name, setNameDay] = useState('')

    // assgin day to Schedule
    const submitForm = async event => {
        event.preventDefault()
        // const user_id = localStorage.getItem('userId')
        try {
            const response = await axios.post('api/schedule/assgin/day/'+schedule.id,
                { day_id, time_from , time_to},
                {
                    headers: { 'Content-Type': 'application/json' ,
                               'Accept':'application/json' ,
                               'Authorization': `Bearer ${localStorage.getItem('access_token')}`   

                    },
                    withCredentials: true
                }
            );
            location.reload()
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
        console.log(day , schedule)
       if(day != null){
            setNameDay(day.name)
            setDay(day.id) 
            setTimeFrom(day.time_from) 
            setTimeTo(day.time_to)
       }else if (day == null) {
            setNameDay('')
            setDay('')
            setTimeFrom('') 
            setTimeTo('')
       }
    },[day,showUpdate])

    return (


        <>
           
            <div className="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden" id="modal3">
               
                <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-900 opacity-75" />
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <Error className="mb-5" errors={errors} />

                <form onSubmit={submitForm} autoComplete="off" className={"space-y-6"} >
                    <div className="mt-4">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <Label htmlFor="day_id">Day</Label>
                            
                                <Input
                                id="day_id"
                                type="text"
                                value={day_name}
                                className="block mt-1 w-full"
                                disabled
                                 />
                                             

                         
                        </div>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <Label htmlFor="time_from">Time from </Label>
                            <Input
                                id="time_from"
                                type="text"
                                value={time_from}
                                className="block mt-1 w-full"
                                onChange={event => setTimeFrom(event.target.value)}
                                required
                            />
                        </div>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <Label htmlFor="time_to">Time to </Label>
                            <Input
                                id="time_to"
                                type="text"
                                value={time_to}
                                className="block mt-1 w-full"
                                onChange={event => setTimeTo(event.target.value)}
                                required
                            />
                        </div>
                    </div>

                <div className="flex items-center justify-end mt-4">
                    <div className="bg-gray-200 px-4 py-3 text-right">
                        <Button className="ml-3  bg-gray-500 " type = "button" onClick={()=>onToggleModal()}>Cancel </Button>
                        <Button className="ml-3" onClick={()=>onToggleModal()}>Update</Button>
                    </div>
                </div>
                </form>
                
                </div>
                </div>
               
               
            </div>
                   
                    
                
                
       
        </>
       
    )
}
