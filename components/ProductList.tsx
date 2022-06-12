import { useContext } from 'react';
import { Context } from '../context'
 
const ProductList = ({ products }: { products: any[] } ) => { 
  return (
    <div className={listStyle}>
      <div className={listGridStyle}>
      {products?.map(product => 
        <ProductItem key={product._id} product={product} />  
      )}
      </div>
    </div>
  )
}

const  ProductItem = ({ product } : { product: any }) => {
  const { dispatch } = useContext(Context as any);
  return (
    <div className="group">
      <div className={itemContainer}>
        <img src={product.imageUrl ? product.imageUrl : 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg'} className={imageStyle} />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">
        {product.name}
      </h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        $ {product.price}
      </p>
      <button className="p-2 bg-indigo-200 rounded" onClick={() => {
        dispatch({ type: 'ADD_TO_CART', payload: product })
      }}>
        Add to cart
      </button>
    </div>
  )
}


const listStyle = `mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8`;

const listGridStyle = `grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8`;

const itemContainer = `aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200`;

const imageStyle = `h-full w-full object-cover object-center group-hover:opacity-75`;

export default ProductList;