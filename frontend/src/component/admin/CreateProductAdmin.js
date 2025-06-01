import React, { Fragment, useEffect, useState } from "react";
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



import {CREATE_PRODUCT_RESET_ADMIN} from "../../constants/productConstants"

import { clearAllErrors, createProductAdmin } from "../../actions/productActions";



import "./createProductAdmin.css"
const CreateProductAdmin = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate()
  
  const { loading, error, isCreated } = useSelector((state) => state.CUDProductAdmin);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

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
    if (error) {
      alert.error(error);
      dispatch(clearAllErrors());
    }

    if (isCreated) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: CREATE_PRODUCT_RESET_ADMIN });
    }
  }, [dispatch, alert, error, navigate, isCreated]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
                                                          // const myForm2 = new FormData();
                                                          // const myForm3 = new FormData();



    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
                                                            // console.log("formA");
                                                            // console.log(myForm);
    
images.forEach((image) => {
    myForm.append("images", image);
  });                                                            



// if(images.length===1){
//   myForm.append("images", images);
//   console.log(`length is 1`);
// }
// else{
//     images.forEach((image) => {
//     myForm.append("images", image);
//   });
//    console.log(`length is not 1 but it is ${images.length}`);
// }

// if (typeof images === "string") {
//   console.log("frontend images is string");
// } else if(Array.isArray(images)) {
//   console.log("frontend images is array");
// }

                                                            
                                                            // console.log("formB");
                                                            // console.log(myForm["name"]);
    //  myForm.set("images",images);
    
    
    // console.log("ddd");
    // console.log(myForm.getAll("images"));
    // console.log("ddd1");
    // console.log(myForm.get("images"));

                                                                // console.log("formC");
                                                                // console.log(myForm);
    
                                                            // console.log("a")
                                                            // for(var item of myForm.entries()){
                                                            //   console.log(item[0],item[1]);
                                                            // }
                                                            // console.log("b")
                                                            // for(var item of myForm2.entries()){
                                                            //   console.log(item[0],item[1]);
                                                            // }
                                                            // console.log("c")
                                                            // for(var item of myForm3.entries()){
                                                            //   console.log(item[0],item[1]);
                                                            // }
  // console.log("kkkkkk");
  // console.log(images.length); 
  // console.log("kkkkkk1");
  // console.log(Array.isArray(images)); 
  
                                                        
   dispatch(createProductAdmin(myForm));
  };   

  const createProductImagesChange = (e) => {
                                                      // console.log("images before ToArray");
                                                      // console.log(e.target.files);
                                                      // console.log(typeof(e.target.files));
    const files = Array.from(e.target.files);
                                                      // console.log("images after ToArray");
                                                      // console.log(files);
                                                      // console.log(typeof(files));
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
          // console.log("abcdef");
          // console.log(images.length);  
        }
      };
      
      reader.readAsDataURL(file);
    });

  // console.log("zzz");
  // console.log(images.length);                                                    
                                                     // console.log("final images in images useState Variable");
                                                      // console.log(images);
                                                      // console.log(typeof(images));
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
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

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
              <select onChange={(e) => setCategory(e.target.value)}>
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
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateProductAdmin;