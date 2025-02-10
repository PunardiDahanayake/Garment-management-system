import React, { useEffect, useState } from "react";
import { PenTool } from "react-feather";

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
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Marketing = (props) => {
  const notify = () => toast.success("Successfully Saved !!");
  const [ProductName, setProductName] = useState("");
  const [InsertedDate, setInsertedDate] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [Description, setDescription] = useState("");
  const [InfromedStatus, setInfromedStatus] = useState("");
  const [ApprovedStatus, setApprovedStatus] = useState("");
  const [MarketingCost, setMarketingCost] = useState("");
  const [Response, setResponse] = useState("");
  const [Keyword, setKeyword] = useState("");
  const [Dropdown, setDropdown] = useState("");
  const Inventory_Router = "inventoryStockRouter/";
  const marketingRouter = "marketingRouter/";
  const getData = () => {
    axios.get(API_URL + marketingRouter + "get").then((response) => {
      setResponse(response.data);
    });
  };
  const getProductNames = () => {
    axios.get(API_URL + Inventory_Router + "get/").then((response) => {
      setDropdown(response.data);
    });
  };
  useEffect(() => {
    if (!Response) {
      getData();
    }
    if (!Dropdown) {
      getProductNames();
    }
  });
  const sendData = () => {
    let model = {
      productName: ProductName,
      marketingCost: Number(MarketingCost),
      remarks: Remarks,
      description: Description,
      approveStatus: ApprovedStatus,
      informedStatus: InfromedStatus,
      createdDate: new Date(),
    };
    console.log(model);
    axios.post(API_URL + marketingRouter + "save/", model).then();
    notify();
    getData();
  };
  return (
    <div>
      <br></br>
      <br></br>
      <SearchBar
        Keyword={Keyword}
        setKeyword={setKeyword}
        Response={Response}
        setResponse={setResponse}
        Router={marketingRouter}
      ></SearchBar>
      <br></br>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <Card>
            <CardHeader>Create Marketing Details</CardHeader>
            <CardBody>
              <Form>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Product Name</Label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          setProductName(e.target.value);
                        }}
                      >
                        {Dropdown &&
                          Dropdown.map((item) => {
                            return (
                              <option value={item.productName}>
                                {item.productName}
                              </option>
                            );
                          })}
                      </select>
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Inserted Date</Label>
                      <Input
                        type="date"
                        placeholder="Inserted Date"
                        onChange={(e) => {
                          setInsertedDate(Moment().format(e.target.value));
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Remarks</Label>
                      <Input
                        type="text"
                        placeholder="Remarks"
                        onChange={(e) => {
                          setRemarks(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Description</Label>
                      <Input
                        type="text"
                        placeholder="Description"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <FormGroup>
                      <Label>Marketing Cost</Label>
                      <Input
                        type="text"
                        placeholder="Marketing Cost"
                        onChange={(e) => {
                          setMarketingCost(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    {" "}
                    <FormGroup>
                      <Label>Approved Status</Label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          setApprovedStatus(e.target.value);
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Infromed Status</Label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          setInfromedStatus(e.target.value);
                        }}
                      >
                        <option value="Informed">Informed</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </FormGroup>
                  </div>
                </div>
              </Form>
              <br></br>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-6">
                  <Button
                    color="primary"
                    onClick={() => {
                      sendData();
                    }}
                  >
                    Create Marketing Details
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
            <CardHeader>All Marketing Details</CardHeader>
            <CardBody>
              <Table>
                <tr>
                  <th style={{ textAlign: "center" }}>Record Id</th>
                  <th style={{ textAlign: "center" }}>Product Name</th>
                  <th style={{ textAlign: "center" }}>Description</th>
                  <th style={{ textAlign: "center" }}>Cost</th>
                  <th style={{ textAlign: "center" }}>Remarks</th>
                  <th style={{ textAlign: "center" }}>Approved Status</th>
                  <th style={{ textAlign: "center" }}>Inform Status</th>
                  <th style={{ textAlign: "center" }}>Inserted Date</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
                {Response &&
                  Response.map((item, index) => {
                    return (
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          {Number(index) + 1}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.productName}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.description}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.marketingCost}
                        </td>
                        <td style={{ textAlign: "center" }}>{item.remarks}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.approveStatus}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.informedStatus}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {Moment(item.createdDate).format("yyyy-DD-MM")}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <div className="row">
                            <div className="col-md-5">
                              <Button type="">Delete</Button>
                            </div>

                            <div className="col-md-5 ml-4">
                              <Button color="primary">Edit</Button>
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
export default Marketing;
