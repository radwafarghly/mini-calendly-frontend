import Head from 'next/head'
import Label from '../components/label'
import Input from '../components/input'
import Button from '../components/button'
import Errors from '../components/errors'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {useState} from 'react'
import axios from  '../plugins/axios';



export default function Register() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user_name, setUserName] = useState('')
    const [errors, setErrors] = useState([])

   // register new user
    const submitForm = async event => {
        event.preventDefault()

        try {
            const response = await axios.post('api/register',
                JSON.stringify({ email, password ,user_name}),
                {
                    headers: { 'Content-Type': 'application/json' ,
                               'Accept':'application/json'    
                    },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response));
            localStorage.setItem('user', JSON.stringify(response.data.data));
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('userId', JSON.stringify(response.data.data.id));

            router.push('/')

        } catch (err) {
            if (!err?.response) {
                setErrors(Object.values('No Server Response').flat())
            } else if (err.response?.status === 400) {
                setErrors(Object.values('Failed validation').flat())

            } else if (err.response?.status === 401) {
                setErrors(Object.values('Unauthorized').flat())

            } else {
                setErrors(Object.values('Login Failed').flat())
            }
        }   
     }

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
                <div className={"mt-32 w-1/2 mx-auto bg-white p-5 pt-8 rounded-lg border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"}>
                    <Errors className="mb-5" errors={errors} />

                    <form onSubmit={submitForm} autoComplete="off" className={"space-y-6"} >
                        <div>
                            <Label htmlFor="email">Email</Label>

                            <Input
                                id="email"
                                type="email"
                                value={email}
                                className="block mt-1 w-full"
                                onChange={event => setEmail(event.target.value)}
                                required
                                autoFocus
                                autoComplete="off"
                            />
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="password">Password</Label>

                            <Input
                                id="password"
                                type="password"
                                value={password}
                                className="block mt-1 w-full"
                                onChange={event => setPassword(event.target.value)}
                                required
                                autoComplete="current-password"
                            />
                        </div>
                        <div className="mt-4">
                            <Label htmlFor="userName">User Name</Label>

                            <Input
                                id="userName"
                                type="text"
                                value={user_name}
                                className="block mt-1 w-full"
                                onChange={event => setUserName(event.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <Link href="/login">
                                <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                    Login Now 
                                </a>
                            </Link>

                            <Button className="ml-3">Register</Button>
                        </div>
                    </form>
                </div>
        </>
    )
}