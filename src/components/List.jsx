import React from "react"
import { ProductList } from "../views/Home"
import ProductCard from "./ProductCard"
import axios from "axios"

const List = () => {
    const [productList, setProductList] = React.useState([])
    console.log(productList)
    React.useEffect(() => {
      axios.get("http://localhost:5000/products/get-all-products" )
      .then((res)=>{ 
      setProductList(res.data)
        console.log(res)
      
      }
      )
      .catch((err)=> console.log(err))
  
  
    }, [])
  
    return(
      <>
      <h2>T-Shirts!</h2>
      <ProductList>
          {productList.map((item) => (
            item.category === 'T-Shirts' ?
              <ProductCard
              name={item.category}
              price={item.current_price}
              image={item.image}
              id={item._id}
              // image={require(`../${item.image}`)}
              />
              : null
          ))}
        
      </ProductList>
      <h2>Button Down Shirts!</h2>
      <ProductList>
          {productList.map((item) => (
                item.category === 'Shirts' ?
                  <ProductCard
                  name={item.category}
                  price={item.current_price}
                  image={item.image}
                  id={item._id}
                  // image={require(`../${item.image}`)}
                  />
                : null
              ))}
      </ProductList>
      <h2>Pajamas!</h2>
      <ProductList>
          {productList.map((item) => (
                item.category === 'Pyjama' ?
                  <ProductCard
                  name={"Pajamas"}
                  price={item.current_price}
                  image={item.image}
                  id={item._id}
                  // image={require(`../${item.image}`)}
                  />
                : null
              ))}
      </ProductList>
      <h2>Henley Shirts!</h2>
      <ProductList>
          {productList.map((item) => (
                item.category === 'Henley Shirts' ?
                  <ProductCard
                  name={item.category}
                  price={item.current_price}
                  image={item.image}
                  id={item._id}
                  // image={require(`../${item.image}`)}
                  />
                : null
              ))}
      </ProductList>
  
      </>
    )
  }

  export default List