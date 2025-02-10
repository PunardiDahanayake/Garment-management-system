import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
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

const QualityControl = (props) => {
  const QualityControl_Router = "qualityControlRouter/";
  const [FabricType, setFabricType] = useState("");
  const [ReportedDate, setReportedDate] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [Description, setDescription] = useState("");
  const [Status, setStatus] = useState("");
  const [Response, setResponse] = useState("");
  const [Keyword, setKeyword] = useState("");

  const notify = () => toast.success("Successfully Saved !!");
  const getAllData = () => {
    axios.get(API_URL + QualityControl_Router + "get/").then((response) => {
      setResponse(response.data);
    });
  };
  const postData = () => {
    const model = {
      type: FabricType,
      remark: Remarks,
      description: Description,
      status: Status,
      priority: "required",
    };

    axios
      .post(API_URL + QualityControl_Router + "save", model)
      .then((response) => {
        setFabricType("");
        setRemarks("");
        setDescription("");
        getAllData();
        notify();
        // Alert("Successfully Created Data!!");
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
        Router={QualityControl_Router}
      ></SearchBar>
      <br></br>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <Card>
            <CardHeader>Create Quality Control Details</CardHeader>
            <CardBody>
              <Form>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Fabric Type</Label>
                      <Input
                        value={FabricType}
                        type="text"
                        placeholder="Fabric Type"
                        onChange={(e) => {
                          setFabricType(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>Reported Date</Label>
                      <Input
                        value={ReportedDate}
                        type="date"
                        placeholder="Reported Date"
                        onChange={(e) => {
                          setReportedDate(Moment().format(e.target.value));
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
                        value={Remarks}
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
                        value={Description}
                        type="text"
                        placeholder="Description"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
                <FormGroup>
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
                </FormGroup>
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
                    Create Quality Control
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
                  <th style={{ textAlign: "center" }}>Fabric Type</th>
                  <th style={{ textAlign: "center" }}>Description</th>
                  <th style={{ textAlign: "center" }}>Remarks</th>
                  <th style={{ textAlign: "center" }}>Status</th>
                  <th style={{ textAlign: "center" }}>Reported Date</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
                {Response &&
                  Response.map((item, index) => {
                    return (
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          {Number(index) + 1}
                        </td>
                        <td style={{ textAlign: "center" }}>{item.type}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.description}
                        </td>
                        <td style={{ textAlign: "center" }}>{item.remark}</td>
                        <td style={{ textAlign: "center" }}>{item.status}</td>
                        <td>
                          {Moment(item.reportedDate).format("yyyy-MM-DD")}
                        </td>
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
export default QualityControl;
