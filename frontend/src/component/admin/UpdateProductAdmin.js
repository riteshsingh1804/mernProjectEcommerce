import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router";

import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

import SideBar from "./Sidebar";
import MetaData from "../layout/MetaData";

import {UPDATE_PRODUCT_RESET_ADMIN} from "../../constants/productConstants"

import { clearAllErrors, updateProductAdmin,getProductDetails } from "../../actions/productActions";

import "./updateProductAdmin.css"


const UpdateProductAdmin = () => {
  
  
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate();
  const {id}=useParams();
  
  const {error,product}=useSelector((state)=>state.productDetails);
  const { loading, error:updateError, isUpdated } = useSelector((state) => state.CUDProductAdmin);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages,setOldImages]=useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if((product&&product._id!==id)){
    //  console.log(`Product is ${product}`);
    //  console.log(`Product id is ${product._id}`);
        dispatch(getProductDetails(id));
    }
    else{
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
        console.log(`Product2 is ${product}`);
    }
    if (error) {
      alert.error(error);
      dispatch(clearAllErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearAllErrors());
    }
    if (isUpdated) {
      alert.success("Product Updated Successfully");
      dispatch(getProductDetails(id));
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET_ADMIN });
    }
    //  console.log(`Product1 is ${product}`);
    //  console.log(`Product1 id is ${product._id}`);

  }, [dispatch, alert, updateError, navigate, isUpdated,id,error,product]);

  
  
  
  
  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
                                                          
    images.forEach((image) => {
    myForm.append("images", image);
  });                                                            
  dispatch(updateProductAdmin(id,myForm));
  };   

   
  
  
  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
                                                    
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);
    console.log(`Product3 is ${product}`);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
          }
      };    
      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages&&oldImages.map((image, index) => (
                <img key={index} src={image.url} alt="Old Product Preview" />
              ))}
            </div>
            <div id="createProductFormImage">
              {imagesPreview&&imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProductAdmin;