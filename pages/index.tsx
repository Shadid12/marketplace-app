import type { NextPage } from 'next'
import { gql, useQuery } from '@apollo/client'
import ProductList from '../components/ProductList'

const GET_PRODUCTS = gql`
query {
  getAllProducts {
    data {
      _id
      name
      description
      price
      imageUrl
      shop {
        _id
      }
    }
  }
}
`

const Home: NextPage = () => {
  const { data, loading } = useQuery(GET_PRODUCTS)
  console.log(' ==> ', data)
  if (loading) return <p>Loading...</p>
  return (
    <ProductList products={data?.getAllProducts.data} />
  )
}

export default Home
