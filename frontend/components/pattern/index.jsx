import axios from "axios";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Table,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { API_URL, SecondaryButton } from "../../constant";
import SearchBar from "../../layout/searchbar";
import swal from 'sweetalert';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const PatternRouter = "patternMakingRouter/";
const notify = () => toast.success("Successfully Saved !!");
const Pattern = (props) => {

  //form data variable
  const [DesignName, setDesignName] = useState("");
  const [Material, setMaterial] = useState("");
  const [MaterialCost, setMaterialCost] = useState("");
  const [Color, setColor] = useState("");
  const [Price, setPrice] = useState("");
  const [Gender, setGender] = useState("");
  const [Size, setSize] = useState("");


  const [ID, setId] = useState("");
  const [Btn, setBtn] = useState("Create New Pattern");

  //table data variable
  const [Response, setResponse] = useState("");
  //search data variable
  const [Keyword, setKeyword] = useState("");


  const clearData = () => {
    console.log("test")
    setDesignName("");
    setColor("");
    setMaterial("");
    setMaterialCost("");
    setPrice("");
    setId('')
    setBtn('Create New Pattern')
  };



  //save data
  const PostData = () => {
    if(!DesignName==""){
      if(!Material==""){
        if(!MaterialCost==""){
          if(!Color==""){
            if(!Price==""){
             

    let model = {
      designName: DesignName,
      material: Material,
      materialCost: Number(MaterialCost),
      color: Color,
      price: Number(Price),
      genderType: Gender,
      size: Size,
    };
    if(ID==""){
      console.log("Model==>", model);
    axios.post(API_URL + PatternRouter + "save", model).then((response) => {
      console.log(response)
      clearData();
      getAllData();
      notify();
    });
  }else{
  
    axios.put(API_URL + PatternRouter + "edit/"+ID, model).then((response) => {
      console.log(response)
      clearData();
      getAllData();
      notify();
    });
  }
}else{
  toast.error("Design Name Required!")
}
}else{
toast.error("Material Required!")
}
}else{
toast.error("Material Cost Required!")
}
}else{
toast.error("Color Required!")
}
}else{
  toast.error("Price Required!")
  }
 
};

const setEdit = (id,DesignName,Material,MaterialCost,Color,Price,Gender,Size) => {
  setDesignName(DesignName)
  setMaterial(Material)
  setMaterialCost(MaterialCost)
  setColor(Color)
  setPrice(Price)
  setGender(Gender)
  setSize(Size)



  setId(id)
  setBtn('Edit Details')
  console.log(id)
};

const savePDF = async() => {
  const doc = new jsPDF("p","pt","a4");
  doc.setFontSize(15);
  doc.text("All Report", 40, 40);
  var data
  var price=0
  var count = 0

  await axios
  .get(API_URL + PatternRouter + "get/")
.then(res => {
    if(res.data){

        console.log(res.data)

        data = res.data

        const headers = [["ID","Design Name","Material","Material Cost","Color","Price","Gender","Size"]];

        const datas = data.map(elt=> [++count,elt.designName,elt.material,elt.materialCost,elt.color,elt.price,elt.genderType,elt.size]);
       
        let content = {
          startY: 50,
          head: headers,
          body: datas
        };

        data.map(res=>{
            price=price+res.cost
        });

   
        doc.autoTable(content)
      }else{
          swal("ERROR!", "NIC ERROR!", "error")
      }
  })
  doc.text("Total Price = Rs. "+price+" /-",40,800)
  doc.text("Total  = "+count,400,800)
  doc.save("report.pdf")
};


//delete data method
const deleteData = (id) => {
  swal({
    title: "Are you sure?",
    text: "Delete this record!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      axios.delete(API_URL + PatternRouter + "delete/"+id)
      .then(res =>{
        toast.success("Delete Successful !!");
        clearData()
        getAllData()
      });
    }
  })
};

 //Table Data Load Function
 const getAllData = () => {
  axios
    .get(API_URL + PatternRouter + "get/")
    .then((response) => {
      console.log(response)
      console.log(response.data)
      setResponse(response.data);
    });
};



  useEffect(() => {
    if (!Response) {
      getAllData();
    }
  });
  return (
    <div>
      <br></br>
      <br></br>
      <SearchBar
        Keyword={Keyword}
        setKeyword={setKeyword}
        Response={Response}
        setResponse={setResponse}
        Router={PatternRouter}
      ></SearchBar>
      <br></br>
      <div className="row">
        <div className="col-md-3"><Button
                    color="primary"
                    //Call Create Data Function
                    onClick={() => {
                      savePDF();
                    }}
                  >
                    Save PDF
                  </Button></div>
        <div className="col-md-6">
          <Card>
            <CardHeader>Create New Pattern</CardHeader>
            <CardBody>
              <Form>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <label>Design Name</label>
                      <Input
                        value={DesignName}
                        type="text"
                        placeholder="Desing Name"
                        onChange={(e) => {
                          setDesignName(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <label>Material</label>
                      <Input
                        value={Material}
                        type="text"
                        placeholder="Material"
                        onChange={(e) => {
                          setMaterial(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <label>Material Cost</label>
                      <Input
                        value={MaterialCost}
                        type="text"
                        placeholder="Material Cost"
                        onChange={(e) => {
                          setMaterialCost(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <label>Color</label>
                      <Input
                        value={Color}
                        type="text"
                        placeholder="Color"
                        onChange={(e) => {
                          setColor(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <label>Price</label>
                      <Input
                        value={Price}
                        type="text"
                        placeholder="Price"
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <label>Gender Type</label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </FormGroup>
                  </div>
                </div>
                <FormGroup>
                  <label>Size</label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setSize(e.target.value);
                    }}
                  >
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </FormGroup>
                
                </Form>
                <br></br>
              <div className="row">
                <div className="col-md-6">

                <Button
                  color="primary"
                  onClick={() => {
                    PostData();
                  }}
                >
                  {Btn}
                  </Button>
                </div>
                <div className="col-md-4">
                <Button
                    color="primary"
                    //Call Create Data Function
                    onClick={() => {
                      clearData();
                    }}
                  >
                  
                  Clear
                </Button>
              </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-3"></div>
      </div>
      <br></br>
      <br></br>

      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
        <CardHeader>All Pattern Details</CardHeader>
          <Card>
            <Table>
              <tr>
                <th style={{ textAlign: "center" }}>Record Id</th>
                <th style={{ textAlign: "center" }}>Pattern Name</th>
                <th style={{ textAlign: "center" }}>Material</th>
                <th style={{ textAlign: "center" }}>Material Cost</th>
                <th style={{ textAlign: "center" }}>Color</th>
                <th style={{ textAlign: "center" }}>Price </th>
                <th style={{ textAlign: "center" }}>Gender Type</th>
                <th style={{ textAlign: "center" }}>Size</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>




              {
              //loop table data 

              Response &&
                Response.map((item, index) => {
                  return (
                    <tr>
                      <td className="tr" style={{ textAlign: "center" }}>
                        {Number(index) + 1}
                      </td>
                      <td className="tr" style={{ textAlign: "center" }}>
                        {item.designName}
                      </td>
                      <td className="tr" style={{ textAlign: "center" }}>
                        {item.material}
                      </td>
                      <td className="tr" style={{ textAlign: "center" }}>
                        {item.materialCost}
                      </td>
                      <td className="tr" style={{ textAlign: "center" }}>
                        {item.color}
                      </td>
                      <td className="tr" style={{ textAlign: "center" }}>
                        {item.price}
                      </td>
                      <td className="tr" style={{ textAlign: "center" }}>
                        {item.genderType}
                      </td>
                      <td className="tr" style={{ textAlign: "center" }}>
                        {item.size}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <div className="row">
                          <div className="col-md-5">
                            <Button type=""
                            onClick={() => {
                              deleteData(item._id);
                            }}>Delete</Button>
                          </div>

                          <div className="col-md-5 ml-1">
                            <Button color="primary"
                             onClick={() => {
                              setEdit(item._id,item.designName,item.material,item.materialCost,item.color,item.price,item.genderType,item.size);
                            }}>Edit</Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </Table>
          </Card>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};
export default Pattern;
