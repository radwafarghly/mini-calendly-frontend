import Label from '../components/label'
import Input from '../components/input'

import { useState } from 'react'
import Button from './button'
import Error from './errors'
import axios from '../plugins/axios'

import { useRouter } from 'next/router'

export default function AddEventModal({onToggleModal,schedules}) {   
    const router = useRouter()
    const [name,SetEventName] = useState('')
    const [description,SetDescription] =useState('')
    const [slug,SetSlug]=useState('')
    const [duration,SetDuration]=useState('')
    const [schedule_id,SetSchedule] = useState('')
    const [time_between,SetTime]=useState('')
    const [user_id , SetUser]= useState(
        typeof window !== "undefined" ? localStorage.getItem('userId') : null
      );  
    const [errors, setErrors] = useState([])
    // save the Schedule
    const submitForm = async event => {
        event.preventDefault()
        const user_id = localStorage.getItem('userId')
        try {
            const response = await axios.post('api/event',
                { name,description,slug,duration,schedule_id,time_between, user_id},
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

            <div className="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden" id="modal">
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
                            <Label htmlFor="Name"> Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                className="block mt-1 w-full"
                                onChange={event => SetEventName(event.target.value)}
                                required
                            />
                        </div>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <Label htmlFor="Description"> Description</Label>
                            <Input
                                id="description"
                                type="text"
                                value={description}
                                className="block mt-1 w-full"
                                onChange={event => SetDescription(event.target.value)}
                                required
                            />
                        </div>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                           < Label htmlFor="Slug"> Event URL</Label>
                            <Input
                                id="slug"
                                type="text"
                                value={slug}
                                className="block mt-1 w-full"
                                onChange={event => SetSlug(event.target.value)}
                                required
                            />
                            <Label htmlFor="Duration">Duration</Label>
                            <Input
                                id="duration"
                                type="text"
                                value={duration}
                                className="block mt-1 w-full"
                                onChange={event => SetDuration(event.target.value)}
                                required
                            />
                            <Label htmlFor="Time_between">Time between</Label>
                            <Input
                                id=""
                                type="text"
                                value={time_between}
                                className="block mt-1 w-full"
                                onChange={event => SetTime(event.target.value)}
                                required
                            />
                        </div>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <Label htmlFor="schedule_id">Schedule</Label>
                            <select id="schedule_id" onChange={event => SetSchedule(event.target.value)}
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          
                            { schedules.map(schedule => (
                               
                                <option key={schedule.id} value={schedule.id}>{schedule.name}</option>
                            ))
                            }

                            </select>
                        </div>
                       
                    </div>

                <div className="flex items-center justify-end mt-4">
                    <div className="bg-gray-200 px-4 py-3 text-right">
                        <Button className="ml-3  bg-gray-500 " type='button' onClick={()=>onToggleModal()}>Cancel </Button>
                        <Button className="ml-3" onClick={()=>onToggleModal()}>Create </Button>
                    </div>
                </div>
            </form>
                
                </div>
            </div>
            </div>
                   
                    
                
                
       
        </>
       
    )
}
