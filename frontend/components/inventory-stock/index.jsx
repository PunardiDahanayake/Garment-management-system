import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { API_URL } from "../../constant";
import SearchBar from "../../layout/searchbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const InventoryStock = (props) => {
  const Inventory_Router = "inventoryStockRouter/";
  const [ProductName, setProductName] = useState("");
  const [Price, setPrice] = useState("");
  const [ExpireDate, setExpireDate] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Status, setStatus] = useState("");
  const [Response, setResponse] = useState("");
  const [Dropdown, setDropdown] = useState("");
  const [Keyword, setKeyword] = useState("");
  const notify = () => toast.success("Successfully Saved !!");
  const getAllData = () => {
    axios.get(API_URL + Inventory_Router + "get/").then((response) => {
      setResponse(response.data);
    });
  };
  const postData = () => {
    const model = {
      productName: ProductName,
      price: Price,
      quantity: Quantity,
      expireDate: ExpireDate,
    };
    console.log("model", model);
    axios.post(API_URL + Inventory_Router + "save", model).then((response) => {
      setProductName("");
      setExpireDate("");
      setQuantity("");
      Alert("Successfully Created Data!!");
      getAllData();
    });
    notify();
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
        Router={Inventory_Router}
      ></SearchBar>
      <br></br>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <Card>
            <CardHeader>Create Inventory Stock Details</CardHeader>
            <CardBody>
              <Form>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Product Name</Label>
                      <Input
                        onChange={(e) => {
                          setProductName(e.target.value);
                        }}
                        placeholder="Product Name"
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Price</Label>
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
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Expire Date</Label>
                      <Input
                        value={ExpireDate}
                        type="date"
                        placeholder="Expire Date"
                        onChange={(e) => {
                          setExpireDate(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Quantity</Label>
                      <Input
                        value={Quantity}
                        type="text"
                        placeholder="Quantity"
                        onChange={(e) => {
                          setQuantity(e.target.value);
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
                    Create Inventory Stock
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
                  <th style={{ textAlign: "center" }}>Price</th>
                  <th style={{ textAlign: "center" }}>Expire Date</th>
                  <th style={{ textAlign: "center" }}>Quantity</th>

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
                        <td style={{ textAlign: "center" }}>{item.price}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.expireDate}
                        </td>
                        <td style={{ textAlign: "center" }}>{item.quantity}</td>
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
export default InventoryStock;
