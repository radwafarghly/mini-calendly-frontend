import Label from '../components/label'
import Input from '../components/input'

import { useState } from 'react'
import Button from './button'
import Error from './errors'
import axios from '../plugins/axios'

import { useRouter } from 'next/router'

export default function AddSchduleModal({onToggleModal}) {   
    const router = useRouter()

    const [name,setScheduleName] = useState('')
    const [errors, setErrors] = useState([])

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
                                onChange={event => setScheduleName(event.target.value)}
                                required
                            />
                        </div>
                    </div>

                <div className="flex items-center justify-end mt-4">
                    <div className="bg-gray-200 px-4 py-3 text-right">
                        <Button className="ml-3  bg-gray-500 " onClick={()=>onToggleModal()}>Cancel </Button>
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
