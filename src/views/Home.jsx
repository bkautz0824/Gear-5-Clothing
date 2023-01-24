import React from 'react';
import styled from 'styled-components';
import List from '../components/List';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;

  /* z-index: 1; */
`;
export const ProductList = styled.ul`
  list-style-type: none;
  height:auto;
  display: flex;
  flex-direction: row;
  width: 80%;
  overflow: hidden;
  overflow-x: scroll;
  margin: 5% 0;
`;
export const NavContainer = styled.nav`
  display:flex;
  align-items: center;
  /* flex: 1 1 auto; */
  background-color: white;
  width:100%;
  height:3%;
  margin:0 auto;
  justify-content: space-evenly;
  border-bottom: 0.5px solid grey;
  position: sticky;
  z-index: 100;
  top:0;
  img{
    height: 5rem;
    width: 5rem;
  };
  a{
    text-decoration: none;
    color: black;
  }

`
export const LandingPage = styled.div`

  margin-top: 2rem;
  width: 100%;
  height: 500px;
  position: relative;
  img{
    width:80%;
    height: 80%;
    opacity: 40%;
    border: 1px solid black;
  }
  h1{
    font-size: 5rem;
    position: absolute;
    top: 10%;
    bottom: 50%;
    right:40%;
    left:35%;
    /* transform: translate(-50%, -50%); */
  }
  /* background-color: white; */
  
`
const Landing = () => {

  return (
    <LandingPage>
          <img src={require('../assets/luffy.jpg')} alt="helloooo"/>
          <h1>Gear 5 Clothing</h1>
    </LandingPage>
  )
}



const Home = () => {
  return (
    <Container>
    <Landing/>
    <List/>
    </Container>
  );
};

export default Home;
