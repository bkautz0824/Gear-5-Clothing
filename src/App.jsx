import React from "react";
import MainRoutes from "./routes/main-routes";
import { NavContainer } from "./views/Home";
import { Link } from "react-router-dom";
import { verify } from "./api-helper/auth-requests";
import styled from "styled-components";

const NavBar = () => {


  return (
    <NavContainer>
      <img src={require('../src/assets/logo.jpg')} alt="logo"/>
      <Link to='/'><p>Home</p> </Link>  
      <Link to='/shopping'><p>Shop</p> </Link>  
      <Link to='/cart'><p>Cart</p> </Link>  
      <Link to='/'><p>Contact</p> </Link>  
      <Link to='/'><p>About</p> </Link>  
       
    </NavContainer>
  )
}

const Container = styled.div`
  color: white;
  background-color: #252e2beb;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`

function App() {

  const [user, setUser] = React.useState()
  console.log(user)

  React.useEffect(() => {
    verify().then((res) => {
      setUser(res.data)
      
    })
    .catch(err => err)
    
  }, [])

  return (

    <Container
      
    >
      <NavBar/>
      { user &&
      <MainRoutes
        user={user}
      />}
    </Container>
  );
}

export default App;
