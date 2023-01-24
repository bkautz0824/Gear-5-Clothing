import React from 'react';
import styled from 'styled-components';
import User from '../../../api/models/user.mjs';
import { removeFromCart} from '../../api-helper/cart-requests'

const ProductItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  flex-direction: row;
  padding: 0 2rem;
  
`;
const ProductImage = styled.img`
  width: 80px;
  height: auto;
  margin-right: 1rem;
`;
const ProductName = styled.h3`
  font-size: 1.25rem;
`;
const ProductPrice = styled.p`
  font-size: 1.125rem;
  /* color: #333; */
`;

interface Props {
    cartItemInfo: {
      productInfo:{
        name: string,
        image: string,
        current_price: number
        _id: string
      },
      quantity: number
    },
    user:any,
    handleCartChange: Function
   
}


const CartProductCard:React.FunctionComponent<Props> = ({
  user, handleCartChange, cartItemInfo:{productInfo:{name, image, current_price, _id }, quantity}
}) => {
  const [imageIsLoaded, setImageIsLoaded] = React.useState(false)
  


  return(
    <ProductItem >
      <ProductImage  src={image} onLoad={() => setImageIsLoaded(true)} alt={name} />
      <div>
        <ProductName>{name}</ProductName>
        <p>x{quantity}</p>
        <ProductPrice>${current_price}</ProductPrice>
        <button
          onClick={async() => {
          await removeFromCart({user_id:user._id, product_id:_id})
          await handleCartChange()
          }
        }
          
        >
          Remove Item
        </button>
      </div>
    </ProductItem>
  )}
  

export default CartProductCard