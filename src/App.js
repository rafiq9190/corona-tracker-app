import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { CardDeck } from "react-bootstrap";
import "./App.css";
import axios from "axios";
import CountUp from "react-countup";
import { CardColumns } from "react-bootstrap";
import { Form } from "react-bootstrap";

function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries"),
      ])
      .then((resArr) => {
        setLatest(resArr[0].data);
        setResults(resArr[1].data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();
  const filterCountries = results.filter((item) => {
    return searchCountries != ""
      ? item.country.includes(searchCountries)
      : item;
  });
  const countries = filterCountries.map((data, i) => {
    return (
      <Card
        key={i}
        bg="light"
        text="dark"
        className="text-center"
        style={{ margin: "10px" }}
      >
        <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>
            <b>Cases</b>--{data.cases}
          </Card.Text>
          <Card.Text>
            <b>Today s'Cases</b> --{data.todayCases}
          </Card.Text>
          <Card.Text>
            <b>Today s' Deaths</b>--{data.todayDeaths}
          </Card.Text>
          <Card.Text>
            <b>Today s' Recovered</b>--{data.recovered}
          </Card.Text>
          <Card.Text>
            <b>Active</b>--{data.active}
          </Card.Text>
          <Card.Text>
            <b>Critical</b>--{data.critical}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  });
  return (
    <div className="container">
      <CardDeck>
        <Card
          bg="secondary"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>CASES</Card.Title>
            <Card.Text>
              <CountUp start={0} duration={2.75} end={7612919}>
                {latest.TotalConfirmed}
              </CountUp>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="danger"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>DEATHS</Card.Title>
            <Card.Text>
              <CountUp start={0} duration={2.75} end={429514}>
                {latest.TotalDeaths}
              </CountUp>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="success"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>RECOVERD</Card.Title>
            <Card.Text>
              <CountUp start={0} duration={2.75} end={3540045}>
                {latest.TotalRecovered}
              </CountUp>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck>

      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Control
            type="email"
            placeholder="Search Your Country"
            onChange={(e) => setSearchCountries(e.target.value)}
          />
        </Form.Group>
      </Form>
      <CardColumns>{countries}</CardColumns>
    </div>
  );
}

export default App;
