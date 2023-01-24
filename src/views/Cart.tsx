import React from 'react'
import { addToCart, removeFromCart } from '../api-helper/cart-requests'
import { getOneUser } from '../api-helper/user-requests'
import CartProductCard from '../components/Cart/CartProductCard'
import _ from "lodash"
import { CartInformation } from '../components/Cart/CartInformation'
import styled from 'styled-components'

const CartPage = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 80%;
`
const CartItemsDisplay = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    margin-top: 1rem;
`

interface CartItemsProps {
    productInfo: any,
    quantity: number,
    user: any
}


const Cart:React.FunctionComponent<CartItemsProps> = ({user}) => {

    const [cart, setCart] = React.useState<Array<CartItemsProps>>()
    // const [cartChange, setCartChange] = React.useState<Boolean>(false)

    React.useEffect(() => {
        getOneUser(user._id).then((res) => 
            {   
                let newCart:Array<any> = []
                res.data.cart.forEach((item:any) => 
                {
                    const doesExist = newCart.findIndex(({productInfo}) => item._id === productInfo._id)
                    console.log(doesExist)
                    if(doesExist === -1) {
                        newCart.push({
                        productInfo: item,
                        quantity: 1
                    })
                    return 
                }
                    newCart[doesExist].quantity = newCart[doesExist].quantity + 1
                }
            )
                setCart(newCart)
            }
        )
        
    }, [])

    const cartDidChange = () => {
        // setCartChange(true)
        getOneUser(user._id).then((res) => 
            {   
                let newCart:Array<any> = []
                res.data.cart.forEach((item:any) => 
                {
                    const doesExist = newCart.findIndex(({productInfo}) => item._id === productInfo._id)
                    console.log(doesExist)
                    if(doesExist === -1) {
                        newCart.push({
                        productInfo: item,
                        quantity: 1
                    })
                    return 
                }
                    newCart[doesExist].quantity = newCart[doesExist].quantity + 1
                }
                )
                setCart(newCart)
            }
        )
    }

  return (

    <CartPage>
        <CartItemsDisplay>
        { 
        cart && cart.map((item:any) => 
            
            <CartProductCard 
                cartItemInfo={item}
                user={user}
                handleCartChange={cartDidChange}
                />
            
             )
        }

        </CartItemsDisplay>
        { 
        cart && <CartInformation
            cart={cart}
        />
        }
        </CartPage>
  )
}

export default Cart