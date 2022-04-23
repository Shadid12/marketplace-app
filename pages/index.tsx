import type { NextPage } from 'next'
import { gql, useQuery } from '@apollo/client'

const GET_SHOP = gql`
query {
  findShopByID(id: "327780139217715792") {
    _id
    description
    name
    ownerID
    products {
      _id
    }
  }
}
`

const Home: NextPage = () => {
  const { data } = useQuery(GET_SHOP)
  console.log(' ==> ', data)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      hello worlds
    </div>
  )
}

export default Home
