import Label from './label'
import Input from './input'

import { useState,useEffect } from 'react'
import Button from './button'
import Error from './errors'
import axios from '../plugins/axios'

import { useRouter } from 'next/router'

export default function AddDayModal({days,onToggleModal,schedule}) {   
    const router = useRouter()
    console.log(days,schedule)

    const [time_from,setTimeFrom] = useState('')
    const [time_to,setTimeTo] = useState('')
    const [errors, setErrors] = useState([])
    const [day_id, setDay] = useState('')
    // assgin day to Schedule
    const submitForm = async event => {
        event.preventDefault()
        const user_id = localStorage.getItem('userId')
        try {
            console.log(schedule.id, { day_id, time_from , time_to})
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
    return (

        <>
            <div className="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden" id="modal2">
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
                            <select id="day_id" onChange={event => setDay(event.target.value)}
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          
                            { days.map(day => (
                               
                                <option key={day.id} value={day.id}>{day.name}</option>
                            ))
                            }

                            </select>
                        </div>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <Label htmlFor="time_from">Time from </Label>
                            <Input
                                id="name"
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
                                id="name"
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
                        <Button className="ml-3  bg-gray-500 " type= "button" onClick={()=>onToggleModal()}>Cancel </Button>
                        <Button className="ml-3">Add</Button>
                    </div>
                </div>
            </form>
                
                </div>
            </div>
            </div>
                   
                    
                
                
       
        </>
       
    )
}
