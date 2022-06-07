import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client/core';
import { httpLink, setAuthToken } from '../gqlClient';

const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!,
    $description: String!,
    $imageUrl: String!,
    $category: String!,
    $price: Float!,
    $shopID: ID!
  ) {
    createProduct(
      data: {
        name: $name,
        description: $description,
        imageUrl: $imageUrl,
        category: $category,
        price: $price,
        shop: {
          connect: $shopID
        }
      }
    ) {
      _id
      name
    }
  }
`

const ProductForm = (props: any) => { 
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    category: '',
    price: '',
  });

  const [createProduct, { client }] = useMutation(CREATE_PRODUCT);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    client.setLink(setAuthToken(props.accessToken).concat(httpLink));
    createProduct({
      variables: {
        ...formData,
        price: Number(formData.price), 
        shopID: props.shopId,
      }
    }).then((res) => {
      alert('Product created successfully!');
      console.log(res);
    });
  }

  return (
    <div className="pr-20 pl-20 pt-5 pb-5">
      <h1 className="text-lg mb-1">Create a new Product</h1>
      <form onSubmit={handleSubmit}>
        <label className={labelStyle}>Product Name </label>
        <div className="mt-1 mb-3">
          <input 
            type="text" 
            name="name" 
            className={inputStyle} 
            onChange={handleChange}
          />
        </div>
        
        <label className={labelStyle}>Description </label>
        <div className="mt-1 mb-3">
          <input type="text" name="description" className={inputStyle} onChange={handleChange}/>
        </div>

        <label className={labelStyle}>Image URL </label>
        <div className="mt-1 mb-3">
          <input type="text" className={inputStyle} name="coverImg" onChange={handleChange}/>
        </div>

        <label className={labelStyle}>Category </label>
        <div className="mt-1 mb-3">
          <input type="text" name="category" className={inputStyle} onChange={handleChange}/>
        </div>

        <label className={labelStyle}>Price</label>
        <div className="mt-1 mb-3">
          <input type="number" className={inputStyle} name="price" onChange={handleChange}/>
        </div>
        <button className={btnStyle} type="submit">Create</button>

      </form>
    </div>
  )
}

const btnStyle = `my-1 rounded-md bg-indigo-100 px-4 py-2 text-indigo-700 hover:bg-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`;

const labelStyle = `block text-sm font-medium text-gray-700`;

const inputStyle = `shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md`;

export default ProductForm;