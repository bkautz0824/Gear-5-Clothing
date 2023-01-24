import React from 'react'
import styled from 'styled-components';
import { Container } from './Home';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

import translatedNames from '../resources/translated-names.json'


export const ShoppingContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  text-align: center;
  display: flex;
  /* align-items: center; */
  flex-direction: column;

  /* z-index: 1; */
`;

export const ShoppingItemsContainer = styled.div`
    justify-content: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const ListItemContianer = styled.div`
  display: flex;
  flex-direction: column;
`

export default function Shopping({user}) {
    const [productList, setProductList] = React.useState([])
    console.log(user)

    React.useEffect(() => {
      axios.get("http://localhost:5000/products/get-all-products" )
      .then((res)=>{ 
      let array = res.data
      setProductList(array)
        // return productList
        }
      )
      .catch((err)=> console.log(err))
    }, [])

  

  return (
    <Container>
       <h1>Shopping</h1> 
       <ShoppingItemsContainer  >
        {productList.length > 0 && productList.map((item) => (

            <ProductCard
              key={item._id}
              user={user}
              id={item._id}
              name={item.category}
              price={item.current_price}
              image={item.image}
              />
      
        ))}
       </ShoppingItemsContainer>
       
      
    </Container>
  )
}
