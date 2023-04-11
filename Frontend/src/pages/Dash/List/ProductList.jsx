import React, { useEffect , useState} from 'react'
import {Link,useParams} from 'react-router-dom'
import './userlist.css'
import {DeleteOutline} from '@mui/icons-material'
// import { DataGrid, renderActionsCell } from '@mui/x-data-grid';
// import Avatar from "@mui/material/Avatar";
import axios from 'axios';

const ProductList = () => {
  const [data, setData] =useState([])
  const {id} = useParams();

  useEffect(()=>{
    
    axios.get('http://localhost:5000/product',{
      headers: {
      authorization : localStorage.getItem('token'),
    },
  }).then(res => setData(res.data))
    .catch(err => console.log(err))
  },
 [id]
  )

const handleDelete =(id) =>{
  alert('Are you sure you want to delete this product?')
  axios.delete('http://localhost:5000/product/productdelete/'+id,{
    headers: {
    authorization : localStorage.getItem('token'),
  }})
  .then(res => {
    window.location.reload();
  })
  .catch(err => console.log(err))
}




  return (
    <div className="userList">
      <h2 className='table-title'>Product List</h2>
      <div>
        <Link to="/dashboard/manageProducts/createProduct" className='editbtn crbtn'>Create +</Link>
      </div>
      
      <div className="tableContainer">
      <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>product_name</th>
          <th>Image</th>
          <th>price</th>
          <th>description</th>
          <th>category_name</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((product) =>{
          return(
            
            <tr key={product.product_id} >
              <td>{product.product_id}</td>
              <td>{product.product_name}</td>
              <td ><img className='product-img' src={`http://localhost:5000/${product.image}`} alt=""  /></td>
              <td>{`${product.price}$`}</td> 
              <td>{product.description}</td>
              <td>{product.category_name}</td>
              <td className='actions'>
                <Link  to={`/dashboard/manageProducts/readp/${product.product_id}`} className='editbtn'>show</Link>
                <Link  to={`/dashboard/manageProducts/editproduct/${product.product_id}`} className='editbtn'>Edit</Link>
                <DeleteOutline onClick={() => handleDelete (product.product_id)} className='delete'/>
              </td>
              
            </tr>
            
            
          )
        }
        )}
      </tbody>
    </table>
      </div>

    {/* <DataGrid rows={userrows} columns={columns} pageSize={20} disableRowSelectionOnClick rowsPerPageOptions={[5]} checkboxSelection /> */}
    </div>
  )
}





export default ProductList