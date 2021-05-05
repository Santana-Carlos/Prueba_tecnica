import React, { Component } from "react";
import "./Main.css";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      main_text: "",
    };
  }

  componentDidMount() {
    fetch(
      "https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=json",
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data[0] !== undefined) this.setState({ main_text: data[0] });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return <div>{"Text: " + this.state.main_text}</div>;
  }
}

export default Main;
