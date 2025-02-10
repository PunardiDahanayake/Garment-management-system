import React, { useEffect, useState } from "react";
import { PenTool } from "react-feather";

import {
  Alert,
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
const ProductionPlanning = (props) => {
  const Production_Router = "productionRouter/";
  const Inventory_Router = "inventoryStockRouter/";
  const [productName, setproductName] = useState("");
  const [amountSpent, setamountSpent] = useState("");
  const [confirmation, setconfirmation] = useState("");
  const [quality, setquality] = useState("");
  const [Status, setStatus] = useState("");
  const [Response, setResponse] = useState("");
  const [Dropdown, setDropdown] = useState("");
  const [Keyword, setKeyword] = useState("");
  const notify = () => toast.success("Successfully Saved !!");
  const getAllData = () => {
    axios.get(API_URL + Production_Router + "get/").then((response) => {
      setResponse(response.data);
    });
  };
  const getProductNames = () => {
    axios.get(API_URL + Inventory_Router + "get/").then((response) => {
      setDropdown(response.data);
    });
  };
  const postData = () => {
    const model = {
      productName: productName,
      amountSpent: amountSpent,
      quality: quality,
      confirmation: confirmation,
    };
    console.log("model", model);
    axios.post(API_URL + Production_Router + "save", model).then((response) => {
      setproductName("");
      setconfirmation("");
      setquality("");
      notify();
      getAllData();
    });
  };
  useEffect(() => {
    if (!Response) {
      getAllData();
    }
    if (!Dropdown) {
      getProductNames();
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
        Router={Production_Router}
      ></SearchBar>
      <br></br>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <Card>
            <CardHeader>Create Production Planning Details</CardHeader>
            <CardBody>
              <Form>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Production Name</Label>
                      <select
                        onChange={(e) => {
                          setproductName(e.target.value);
                        }}
                        className="form-control"
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
                      <Label>Amount Spent</Label>
                      <Input
                        value={amountSpent}
                        type="text"
                        placeholder="Amount Spent"
                        onChange={(e) => {
                          setamountSpent(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Confirmation Description</Label>
                      <Input
                        value={confirmation}
                        type="text"
                        placeholder="Confirmation Description "
                        onChange={(e) => {
                          setconfirmation(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Quality</Label>
                      <Input
                        value={quality}
                        type="text"
                        placeholder="Quality"
                        onChange={(e) => {
                          setquality(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
                {/* <FormGroup>
                  <Label>Status</Label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </FormGroup> */}
              </Form>
              <br></br>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-6">
                  <Button
                    color="primary"
                    onClick={() => {
                      postData();
                    }}
                  >
                    Create Production Planning
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
            <CardHeader>All Quality Details</CardHeader>
            <CardBody>
              <Table>
                <tr>
                  <th style={{ textAlign: "center" }}>Record Id</th>
                  <th style={{ textAlign: "center" }}>Product Name</th>
                  <th style={{ textAlign: "center" }}>Amount Spent</th>
                  <th style={{ textAlign: "center" }}>Confirmation</th>
                  <th style={{ textAlign: "center" }}>Quality</th>

                  <th>Actions</th>
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
                          {item.amountSpent}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.confirmation}
                        </td>
                        <td style={{ textAlign: "center" }}>{item.quality}</td>
                        <td style={{ textAlign: "center" }}>
                          <div className="row">
                            <div className="col-md-5">
                              <Button type="">Delete</Button>
                            </div>

                            <div className="col-md-5 ml-1">
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
export default ProductionPlanning;
