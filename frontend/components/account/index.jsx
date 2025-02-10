import React, { useEffect, useState } from "react";
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
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import swal from 'sweetalert';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Account = (props) => {
  //Form Detail Variables
  const [EmpId, setEmpId] = useState("");
  const [Salary, setSalary] = useState("");
  const [SalaryType, setSalaryType] = useState("");
  const [LabourCost, setLabourCost] = useState("");
  const [ID, setId] = useState("");
  const [Btn, setBtn] = useState("Create Account Details");
  //Employee Dropdown Data Variable
  const [Dropdown, setDropdown] = useState("");
  //Table Data Variable
  const [Response, setResponse] = useState("");
  //Search Keyword Variable
  const [Keyword, setKeyword] = useState("");
  //Account Router
  const accountRouter = "accountRouter/";
  //HR Router
  const hrRouter = "hrRouter/";
  //Notification
  const notify = () => toast.success("Successfully Saved !!");



  const dataClear = () => {
    console.log("test")
    setEmpId('')
    setSalary('Approved')
    setSalaryType('')
    setLabourCost('')
    setId('')
    setBtn('Create Account Details')
  }





  //Dropdown Data Load Function
  const getEmployeeDetails = () => {
    axios.get(API_URL + hrRouter + "get").then((response) => {
      setDropdown(response.data);
    });
  };






  //Save Data Function
  const saveData = () => {
    if(!EmpId==""){
      if(!Salary==""){
        if(!SalaryType==""){
          if(!LabourCost==""){
    let model = {
      empId: EmpId,
      salary: Number(Salary),
      salaryType: SalaryType,
      laborCost: Number(LabourCost),
    };


    if(ID==""){
      console.log("Model==>", model);
      axios.post(API_URL + accountRouter + "save", model).then((response) => {
        console.log(response)
        dataClear()
        getAllData()
        notify()
      });


    }else{
      axios.put(API_URL + accountRouter + "edit/"+ID, model).then((response) => {
        console.log(response)
        dataClear()
        getAllData()
        notify()
      });
    }
  }else{
    toast.error("Labour Cost Required!")
  }
}else{
  toast.error("Salary Type Required!")
}
}else{
toast.error("Salary Required!")
}
}else{
toast.error("EmpId Required!")
}
};


const setEdit = (id,EmpId,Salary,SalaryType,LabourCost) => {
  setEmpId(EmpId)
  setSalary(Salary)
  setSalaryType(SalaryType)
  setLabourCost(LabourCost)
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
  .get(API_URL + accountRouter + "get/")
.then(res => {
    if(res.data){

        console.log(res.data)

        data = res.data


        const headers = [["ID","EmpId","Salary","Salary Type","Labour Cost"]];

        const datas = data.map(elt=> [++count,elt.accountId,elt.empId,elt.salary,elt.salaryType,elt.labourCost]);

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
      axios.delete(API_URL + accountRouter + "delete/"+id)
      .then(res =>{
        toast.success("Delete Successful !!");
        dataClear()
        getAllData()
      });
    }
  })
};


 //Table Data Load Function
 const getAllData = () => {
  axios
    .get(API_URL + accountRouter + "get/")
    .then((response) => {
      console.log(response)
      console.log(response.data)
      setResponse(response.data);
    });
};










   
  //Form Load Function
  useEffect(() => {
    if (!Dropdown) {
      getEmployeeDetails();
    }
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
        Router={accountRouter}
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
            <CardHeader>Create Account Details</CardHeader>
            <CardBody>
              <Form>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Employee </Label>
                      <select
                        className="form-control"
                        //Set Data to the variable
                        onChange={(e) => {
                          setEmpId(e.target.value);
                        }}
                      >
                        {Dropdown &&
                          Dropdown.map((item) => {
                            return (
                              <option value={item.fName}>{item.fName}</option>
                            );
                          })}
                      </select>
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Salary</Label>
                      <Input
                        type="text"
                        placeholder="Salary"
                        onChange={(e) => {
                          setSalary(Number(e.target.value));
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Salary Type</Label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          setSalaryType(e.target.value);
                        }}
                      >
                        <option value="Card">Card</option>
                        <option value="Cash">Cash</option>
                        <option value="Cheque">Cheque</option>
                      </select>
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Labour Cost</Label>
                      <Input
                        type="text"
                        placeholder="Labour Cost"
                        onChange={(e) => {
                          setLabourCost(Number(e.target.value));
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
                      saveData();
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
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <Card>
            <CardHeader>All Account Details</CardHeader>
            <CardBody>
              <Table>
                <tr>
                  <th style={{ textAlign: "center" }}>Record Id</th>
                  <th style={{ textAlign: "center" }}>Account Id</th>
                  <th style={{ textAlign: "center" }}>Salary</th>
                  <th style={{ textAlign: "center" }}>Salary Type</th>
                  <th style={{ textAlign: "center" }}>Labour Cost</th>
                  <th style={{ textAlign: "center" }}>Employee Name </th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
                {
                  //Loop Table Data
                  Response &&
                    Response.map((item, index) => {
                      return (
                        <tr>
                          <td style={{ textAlign: "center" }}>
                            {Number(index) + 1}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.accountId}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.salary}
                            </td>
                          <td style={{ textAlign: "center" }}>
                            {item.salaryType}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.laborCost}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.empId}
                            </td>
                          <td style={{ textAlign: "center" }}>
                            <div className="row">
                              <div className="col-md-5">
                                <Button type=""
                                onClick={() => {
                                  deleteData(item._id);
                                }}
                                >Delete</Button>
                              </div>

                              <div className="col-md-5 ml-3">
                                <Button color="primary"
                                 onClick={() => {
                                  setEdit(item._id,item.accountId,item.salary,item.salaryType,item.laborCost);
                                }}
                                >Edit</Button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                }
              </Table>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
};
export default Account;
