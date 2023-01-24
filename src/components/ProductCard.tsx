import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { addToCart } from '../api-helper/cart-requests';

const ProductItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
  flex-direction: column;
  padding: 0 2rem;
  width: 200px;
  height: auto;
  
`;
const ProductImage = styled.img`
  width: 160px;
  height: 200px;
  margin-right: 1rem;
`;
const ProductName = styled.p`
  font-size: 1.25rem;
  margin: 0;
`;
const ProductPrice = styled.p`
  font-size: 1.125rem;
  
`;
const AddToCart = styled.button`
  width: 100px;
  height:auto;
`

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  id: string;
  user: any
}

const ProductCard:React.FunctionComponent<ProductCardProps> = ({ user, id, name, price, image }) => {
  const [imageIsLoaded, setImageIsLoaded] = React.useState(false) 
 
  return(
    <ProductItem style={imageIsLoaded ? {} : {display:"none"}}>
      <Link to={`/${id}`}
        style={{ textDecoration: "none", color: "white"}}
      >
        <ProductImage  src={image} onLoad={() => setImageIsLoaded(true)} alt={name} />
      </Link>
        <ProductName>{name != 'Pyjama' ? name : "Pajamas" }</ProductName>
        <ProductPrice>${price}</ProductPrice>
        <AddToCart
          onClick={() => addToCart({user_id:user._id, product_id:id})}
        >
            Add to Cart
        </AddToCart>
        
    </ProductItem>
  )}
  ;

export default ProductCard