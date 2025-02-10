import React, { useEffect, useState } from "react";
import { PenTool } from "react-feather";
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
import { API_URL } from "../../constant";
import axios from "axios";
import SearchBar from "../../layout/searchbar";
import swal from 'sweetalert';
import { jsPDF } from "jspdf";
import "jspdf-autotable";




const HR = (props) => {



  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [NIC, setNIC] = useState("");
  const [Civil, setCivil] = useState("Married");
  const [UserRole, setUserRole] = useState("Junior Executive");
  const [Address, setAddress] = useState("");
  const [DOB, setDOB] = useState("");
  const [Gender, setGender] = useState("");
 

  const [ID, setId] = useState("");
  const [Btn, setBtn] = useState("Create Employee Details");

  const [Response, setResponse] = useState("");
  const [Keyword, setKeyword] = useState("");

  const hrRouter = "hrRouter/";
  //Notification
  const notify = () => toast.success("Successfully Saved !!");


  const dataClear = () => {
    console.log("test")
    setFirstName('')
    setLastName('Approved')
    setPhoneNumber('')
    setNIC('')
    setCivil('')
    setUserRole('')
    setAddress('')
    setGender('')
    setDOB('')
 
    setId('')
    setBtn('Create Employee Details')
  }




//save data
  const setData = () => {
    if(!NIC==""){
      if(!Civil==""){
        if(!PhoneNumber==""){
          if(!Address==""){
            if(!DOB==""){
              if(!Gender==""){
                if(!FirstName==""){
                  if(!LastName==""){    
                    if(!UserRole==""){
                  
    let model ={
      nic: NIC,
      civilStatus: Civil,
      phoneNumber: Number(PhoneNumber),
      address: Address,
      dob: DOB,
      gender: Gender,
      fName: FirstName,
      lName: LastName,
      userRole: UserRole,
      joinDate: new Date(),
    };
    if(ID==""){
      console.log("Model==>", model);
      axios.post(API_URL + hrRouter + "save", model).then((response) => {
        console.log(response)
        dataClear()
        getData()
        notify()
      });
    }else{
      axios.put(API_URL + hrRouter + "edit/"+ID, model).then((response) => {
        console.log(response)
        dataClear()
        getData()
        notify()
      });
    }
  }else{
    toast.error("User Role Required!")
  }
}else{
  toast.error("Last Name Required!")
}
}else{
toast.error("First Name Required!")
}
}else{
  toast.error("Gender Required!")
  }
}else{
  toast.error("DOB Required!")
}
}else{
  toast.error("Address Required!")
  }
}else{
  toast.error("PhoneNumber Required!")
}
}else{
  toast.error("Civil Required!")
  }
}else{
toast.error("NIC Required!")
}

};

const setEdit = (id,FirstName,LastName,PhoneNumber,NIC,Civil,UserRole,Address,Gender,DOB) => {
  setFirstName(FirstName)
    setLastName(LastName)
    setPhoneNumber(PhoneNumber)
    setNIC(NIC)
    setCivil(Civil)
    setUserRole(UserRole)
    setAddress(Address)
    setGender(Gender)
    setDOB(DOB)
   

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
    .get(API_URL + hrRouter + "get/")
  .then(res => {
      if(res.data){

          console.log(res.data)

          data = res.data


//report column name
          const headers = [["ID","First Name","Last Name","Civil status","NIC","Phone Number","UserRole","Address","DOB","Gender"]];

          const datas = data.map(elt=> [++count,elt.fName,elt.lName,elt.civilStatus, elt.nic,elt.phoneNumber,elt.userRole,elt.address,elt.dob,elt.gender]);

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
      axios.delete(API_URL + hrRouter + "delete/"+id)
      .then(res =>{
        toast.success("Delete Successful !!");
        dataClear()
        getData()

      });
    }
  })
};

//table data load function
const getData = () => {
    axios
      .get(API_URL + hrRouter + "get/")
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
        Router={hrRouter}
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
                  </Button>

        </div>
        <div className="col-md-6">
          <Card>
            <CardHeader>Create Employee Details</CardHeader>
            <CardBody>
              <Form>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>First Name</Label>
                      <Input
                        type="text"
                        placeholder="First Name"
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Last Name</Label>
                      <Input
                        type="text"
                        placeholder="Last Name"
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>NIC</Label>
                      <Input
                        type="text"
                        placeholder="NIC"
                        onChange={(e) => {
                          setNIC(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Phone Number</Label>
                      <Input
                        type="text"
                        placeholder="Phone Number"
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Civil Status</Label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          setCivil(e.target.value);
                        }}
                      >
                        <option value="Married">Married</option>
                        <option value="Single">Single</option>
                      </select>
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>User Role</Label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          setUserRole(e.target.value);
                        }}
                      >
                        <option value="Junior Executive">
                          Junior Executive
                        </option>
                        <option value="Executive">Executive</option>
                        <option value="Senior Executive">
                          Senior Executive
                        </option>
                        <option value="Associate Manager">
                          Associate Manager
                        </option>
                        <option value="Manager">Manager</option>
                        <option value="Genaral Manager">Genaral Manager</option>
                        <option value="Director">Director</option>
                      </select>
                    </FormGroup>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Address</Label>
                      <Input
                        type="text"
                        placeholder="Address"
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Date of Birth</Label>
                      <Input
                        type="date"
                        placeholder="NIC"
                        onChange={(e) => {
                          setDOB(Moment().format(e.target.value));
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
                <FormGroup>
                  <Label>Gender</Label>
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
              </Form>
              <br></br>
              <div className="row">
                
                <div className="col-md-6">
                  <Button
                    color="primary"
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
                  > Clear
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
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <Card>
            <CardHeader>All Employee Details</CardHeader>
            <CardBody>
              <Table>
                <tr>
                  <th>Record Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>NIC</th>
                  <th>Phone Number</th>
                  <th>Civil Status</th>
                  <th>User Role</th>
                  <th>Address</th>
                  <th>Gender</th>
                  <th>Date of Birth</th>
                  <th>Date of Joined</th>
                  <th>Actions</th>
                </tr>


                {
                
                //loop data table
                Response &&
                  Response.map((item, index) => {
                    return (
                      <tr>
                        <td>{Number(index) + 1}</td>
                        <td>{item.fName}</td>
                        <td>{item.lName}</td>
                        <td>{item.nic}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.civilStatus}</td>
                        <td>{item.userRole}</td>
                        <td>{item.address}</td>
                        <td>{item.gender}</td>
                        <td>{Moment(item.dob).format("yyyy-DD-MM")}</td>
                        <td>{Moment(item.joinDate).format("yyyy-DD-MM")}</td>

                      <td>
                          <div className="row">
                            <div className="col-md-5">
                              <Button type=""
                                   onClick={() => {
                                   deleteData(item._id);
                                }}
                              >Delete</Button>
                            </div>
                            <div className="col-md-2"></div>
                            <div className="col-md-5">
                              <Button color="primary"
                              onClick={() => {
                                setEdit(item._id,item.fName,item.lName,item.nic,item.phoneNumber,item.civilStatus,item.userRole,item.address,item.gender,item.dob);
                              }}>Edit</Button>
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
        <div className="col-md-1"></div>
      </div>
    </div>
  );
};
export default HR;