import React from 'react'
import styled from 'styled-components'
import SizeSelect from '../MuiComponents/SizeSelect'
import { addToCart } from '../../api-helper/cart-requests';
import AddToCartButton from '../MuiComponents/AddToCartButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Container = styled.div`
    width: 50%;
  height: auto;
  margin-left: 1rem;

`

interface IProductInfo {
    item: any
    user:any
}

const ProductInfo:React.FunctionComponent<IProductInfo> = ({item, user}) => {
  
    const {name, current_price, category, _id} = item
    console.log(user, item)
    return (
    <Container>
        <p>{category}</p>
        <p>{name}</p>
        <p>{current_price}</p>
        <SizeSelect />
        <Stack spacing={2} direction="row">
          <Button 
          variant="contained" 
          sx={{marginTop:2}}
          onClick={() => addToCart({user_id:user, product_id:_id})}
          >
            Add to Cart
          </Button>
        </Stack>
    </Container>
  )
}

export default ProductInfo