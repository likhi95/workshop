import { stringify } from 'querystring';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        email: '',
        password: ''
    })
    const [status, setStatus] = React.useState(true)
    console.log(status)
    const onEmailcheck = (event: any) => {
        setFormData((prevData) => ({
            ...prevData,
            email: event.target.value
        }))
    }

    const onPasswordCheck = (event: any) => {
        setFormData((prevData) => ({
            ...prevData,
            password: event.target.value
        }))
    }

    const loginCheck = async (event: any) => {
        event.preventDefault();

        try {
            const response = await fetch("http://192.168.1.89:8080/api/users/signIn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            console.log(response.status)
            const data = await response.json();
            console.log(data)

            if (response.status === 200) {
                // console.log(data[0].name)
                // const userName = data[0].fullName;
                console.log("Sign in successful")
                navigate('/admin')

            } else {
                console.log("Sign in failed")
                setStatus(false)
            }

            // navigate('/admin')

        } catch (error) {
            console.log("Sign-in Failed:",error)
        }
    }
    
    return (
        <div className="login-bg">
            <form className="glass-card" onSubmit={loginCheck}>

                <h2 className='title'>Login</h2>
                <input type="text" placeholder="Email" className='glass' value={formData.email} onChange={onEmailcheck} />
                <input type="password" placeholder="Password" className='glass' value={formData.password} onChange={onPasswordCheck} />
                <button className='primary'>Login</button>
                {status === false && <p style={{ "color": "red" }}>Sign in failed !! Try Agian...</p>}
            </form>
        </div>
    );
}
