import svg from './../../svg'
import React, { useEffect, useState } from 'react'
import './../../css/enter/enter.css'
import axios from 'axios'
import Input from './Input'
import { useNavigate } from 'react-router-dom'
import bg from './../../img/Login/bg-login.jpg'
import Code from './Code'

function ForgotPwd({email}) {
    const [code, setCode] = useState('')
    const [validity, setValidity] = useState('f')
    const [error,setError] = useState('')
    const [isEmail,setIsEmail] = useState(false)
    const navigate = useNavigate()

    const codeChange = (e) => {
        const userCode = e.target.value;
        setCode(userCode)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        const response = await axios.post("http://localhost:5000/auth/forgot",{
            email:code
        })
        console.log(response.data.message)
        if (response.data.message == 'Yes') {setIsEmail(true)}
        else {setValidity('in');setError('Email is Invalid')}
    }

    const resendCode = () => {
        alert('Code resent!'); 
    };
  return (
    
        isEmail ? <Code email={code} /> :
    <div className="container-fluid " style={{ height: '100vh' }}>
    <div className="row">
        <div className="col-lg-6 d-none d-sm-block p-0">
            <img src="img/Login/iitj.jpg" style={{width:'100%',height:'100vh'}} />
        </div>
        <div className="col-lg-6 col-xs-12 p-0" style={{backgroundImage:`url(${bg})`,backgroundPosition:'center',backgroundSize:'100'}}>
        <form onSubmit={onSubmit}>
        <div className="d-flex h-100 align-items-center justify-content-center Signup-page">
            <div className="h-75 w-50 bg-white d-flex justify-content-center flex-column p-5 signup-form" style={{ borderRadius: '25px' }}>
                <p className='text-center display-4 mt-5 mb-5'>Forgot Password</p>

                <p className="text-center mb-3">Please enter your email</p>

                <Input
                    label={"Email"}
                    validity={validity}
                    svg={svg.color}
                    onChange={codeChange}
                    placeholder={"Enter the code received on your email"}
                    type={"email"}
                    error={error}
                />

                <button type='submit' className='btn btn-primary btn-lg mt-2 rounded-5 otp-btn'>Send OTP</button>
            </div>
        </div>
    </form>
        </div>
    </div>
</div>
    
  )
}

export default ForgotPwd