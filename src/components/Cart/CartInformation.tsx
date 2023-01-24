import * as React from 'react';
import styled from 'styled-components';

const CartInfoContainer = styled.div`
  margin: 2rem 0;
  height: 100px;
  border: 1px solid black;
  p{
    padding: 1rem 2rem;
  }

`


export interface ICartInformationProps {
    cart: any
}

export function CartInformation ({cart}: ICartInformationProps) {
    const [subtotal, setSubtotal] = React.useState<number>()

React.useEffect(() => {
    setSubtotal(cart.reduce((total:number, item:any) => 
    item.quantity > 1 ? total + (item.quantity * item.productInfo.current_price) : total + item.productInfo.current_price,
    0).toFixed(2))
    // console.log(subtotal)
}, [cart])

  return (
    <CartInfoContainer>
      <p>Subtotal: ${subtotal}</p>
      
    </CartInfoContainer>
  );
}
