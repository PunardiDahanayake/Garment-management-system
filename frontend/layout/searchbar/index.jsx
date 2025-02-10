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
import { API_URL, Uses } from "../../constant";
const SearchBar = (props) => {
  const { Keyword, setKeyword } = props;
  const { Response, setResponse } = props;
  const [Validation, setValidation] = useState("");
  const searchData = () => {
    if (Keyword == null || Keyword == undefined || Keyword == "") {
      setValidation("Please Enter Keyword !");
    } else {
      axios.get(API_URL + props.Router + "get/" + Keyword).then((response) => {
        setResponse(response.data);
        console.log("SearchRes=>", response);
      });
    }

    return Response;
  };
  return (
    <Card>
      <CardBody>
        <div className="searchBar">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-9">
                  <Input
                    placeholder="Search Items"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <Button
                    color="primary"
                    onClick={() => {
                      searchData();
                    }}
                  >
                    Search
                  </Button>
                </div>
              </div>
              <div className="row">
                {Validation && (
                  <small className="ml-4" style={{ color: "red" }}>
                    <a>{Validation}</a>
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default SearchBar;
