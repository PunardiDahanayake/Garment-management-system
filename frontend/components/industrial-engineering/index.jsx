import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
  Table,
} from "reactstrap";
import Moment from "moment";
import axios from "axios";
import { API_URL } from "../../constant";
import SearchBar from "../../layout/searchbar";
import swal from 'sweetalert';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const IndustrialEngineering = (props) => {

  //Form Detail Variables
  const [ProductMethod, setProductMenthod] = useState("");
  const [ResearchStatus, setResearchStatus] = useState("Approved");
  const [Description, setDescription] = useState("");
  const [Cost, setCost] = useState("");
  const [ID, setId] = useState("");
  const [Btn, setBtn] = useState("Create Account Details");

  //table data variable
  const [Response, setResponse] = useState("");

  //search keyword variable
  const [Keyword, setKeyword] = useState("");

  //industrialEngineering Router
  const industrialEngineeringRouter = "industrialEngineeringRouter/";

  //Notification
  const notify = () => toast.success("Successfully Saved !!");

  const dataClear = () => {
    console.log("test")
    setProductMenthod('')
    setResearchStatus('Approved')
    setDescription('')
    setCost('')
    setId('')
    setBtn('Create Account Details')
  }

  //save data
  const setData = () => {
    if(!ProductMethod==""){
      if(!ResearchStatus==""){
        if(!Description==""){
          if(!Cost==""){
            let model = {
              poductMethod: ProductMethod,
              researchStatus: ResearchStatus,
              description: Description,
              cost: Number(Cost),
            };
            if(ID==""){
              console.log("Model==>", model);
              axios.post(API_URL + industrialEngineeringRouter + "save", model).then((response) => {
                console.log(response)
                dataClear()
                getData()
                notify()
              });
            }else{
              axios.put(API_URL + industrialEngineeringRouter + "edit/"+ID, model).then((response) => {
                console.log(response)
                dataClear()
                getData()
                notify()
              });
            }
          }else{
            toast.error("Cost Required!")
          }
        }else{
          toast.error("Description Required!")
        }
      }else{
        toast.error("Research Status Required!")
      }
    }else{
      toast.error("Product Method Required!")
    }
  };

  const setEdit = (id,ProductMenthod,ResearchStatus,Description,Cost) => {
    setProductMenthod(ProductMenthod)
    setResearchStatus(ResearchStatus)
    setDescription(Description)
    setCost(Cost)
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
      .get(API_URL + industrialEngineeringRouter + "get/")
    .then(res => {
        if(res.data){

            console.log(res.data)

            data = res.data
                        
            const headers = [["ID","Product Method","Research Status","Description","Cost"]];

            const datas = data.map(elt=> [++count,elt.poductMethod,elt.researchStatus,elt.description,elt.cost]);

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
        axios.delete(API_URL + industrialEngineeringRouter + "delete/"+id)
        .then(res =>{
          toast.success("Delete Successful !!");
          dataClear()
          getData()
        });
      }
    })
  };

  //Table Data Load Function
  const getData = () => {
    axios
      .get(API_URL + industrialEngineeringRouter + "get/")
      .then((response) => {
        console.log(response)
        console.log(response.data)
        setResponse(response.data);
      });
  };

   
  useEffect(() => {
    if (!Response) {
      getData();
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
        Router={industrialEngineeringRouter}
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
            <CardHeader>Create Account Details</CardHeader>
            <CardBody>
              <Form>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Research Status </Label>
                      <select
                        className="form-control"
                        value={ResearchStatus}
                        //Set Data to the variable
                        onChange={(e) => {
                          setResearchStatus(e.target.value);
                        }}
                      >
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Product Method</Label>
                      <Input
                        type="text"
                        placeholder="Product Method"
                        value={ProductMethod}
                        onChange={(e) => {
                          setProductMenthod(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Description</Label>
                      <Input
                        type="text"
                        placeholder="Description"
                        value={Description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label> Cost</Label>
                      <Input
                        type="text"
                        value={Cost}
                        placeholder=" Cost"
                        onChange={(e) => {
                          setCost(Number(e.target.value));
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
              </Form>
              <br></br>
              <div className="row">
                <div className="col-md-6">
                  <Button
                    color="primary"
                    //Call Create Data Function
                    onClick={() => {
                      setData();
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
                      dataClear();
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
          <Card>
            <CardHeader>All Account Details</CardHeader>
            <CardBody>
              <Table>
                <tr>
                  <th style={{ textAlign: "center" }}>Record Id</th>
                  <th style={{ textAlign: "center" }}>Product Method</th>
                  <th style={{ textAlign: "center" }}>Research Status</th>
                  <th style={{ textAlign: "center" }}>Description</th>
                  <th style={{ textAlign: "center" }}> Cost</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
                {
                  
                 //loop table data
                Response &&
                  Response.map((item, index) => {
                    return (
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          {Number(index) + 1}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.poductMethod}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.researchStatus}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.description}
                        </td>
                        <td style={{ textAlign: "center" }}>{item.cost}</td>

                        <td style={{ textAlign: "center" }}>
                          <div className="row">
                            <div className="col-md-5">
                              <Button type=""
                              onClick={() => {
                                deleteData(item._id);
                              }}
                              >Delete</Button>
                            </div>
                            <div className="col-md-5 ml-1">
                              <Button color="primary"
                                onClick={() => {
                                  setEdit(item._id,item.poductMethod,item.researchStatus,item.description,item.cost);
                                }}
                              >Edit</Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </Table>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};
export default IndustrialEngineering;
