import { login } from '../api-helper/auth-requests'
import React from 'react'


const Login = () => {
    React.useEffect(() => {
        login({username: "shamman", password:"password"}).then(res => console.log(res))
        .catch((err) => err)
    }, [])

  return (
    <div>
        
        <button>Login</button>

    </div>
  )
}

export default Login