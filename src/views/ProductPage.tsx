import React from 'react'
import { getOneProduct } from '../api-helper/product-requests'
import styled from 'styled-components';
import ProductInfo from '../components/ProductPage/ProductInfo';
import { useParams } from 'react-router-dom';

const ProductImage = styled.img`
  width: 50%;
  height: auto;
  margin-right: 1rem;
`;

const ContentContainer = styled.div`
    width: 90%;
    margin: 2rem 2rem;
    display: flex;
    flex-direction: row;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;

`
type ProductProps = {
    id: number
}

const ProductPage:React.FunctionComponent<ProductProps> = () => {
    const [item, setItem] = React.useState<any>()

    const {id} = useParams()
    console.log(id)
 
    React.useEffect(() => {
        getOneProduct(`${id}`)
        .then((res) => {
            console.log(res.data)
            setItem(res.data)
        })
        .catch((err) => console.log(err))
    }, [])

  return (
    <Container>
        <h1>Product Page</h1>
        {item && 
        <ContentContainer>
            <ProductImage src={item.image}/>
            <ProductInfo
                item={item}
                user={id}
            />
            
        </ContentContainer>
        }
        


    </Container>
  )
}

export default ProductPage