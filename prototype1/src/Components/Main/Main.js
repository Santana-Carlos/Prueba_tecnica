import React, { Component } from "react";
import "./Main.css";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      ori_text: "",
      top_words: [],
      temp_top: [
        {
          id: "control_value",
          count: 0,
        },
      ],
      set_words: "",
      set_chars: "",
      set_parags: 3,
      set_lorem: 0,
    };
  }

  componentDidMount() {
    this.callApi();
  }

  callApi = () => {
    fetch(
      "https://baconipsum.com/api/?type=meat-and-filler&paras=" +
        this.state.set_parags +
        "&start-with-lorem=" +
        this.state.set_lorem +
        "&format=json",
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let temp_text = " ";
        if (data[0] !== undefined)
          for (let i = 0; i < data.length; i++) temp_text = temp_text + data[i];

        this.setState({ ori_text: temp_text }, this.splitWords);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  splitWords = () => {
    //normalize text, removing puntuation, line breaks and lower casing the whole string
    let temp_text = this.state.ori_text.toLowerCase().replace(/[.,]/g, " ");

    let temp_words = temp_text.split(" ").filter((x) => x !== ""); //split string into words (array)

    //counting parags words and chars
    this.setState({
      set_words: temp_words.length,
      set_chars: this.state.ori_text.length,
    });

    for (let i = 0; i < temp_words.length; i++) {
      if (this.state.temp_top.findIndex((x) => x.id === temp_words[i]) > -1)
        continue;
      let temp_count = temp_text.split(" " + temp_words[i] + " ").length - 1;
      this.setState({
        temp_top: this.state.temp_top.push({
          id: temp_words[i],
          count: temp_count,
        }),
      });
    }
    this.setState({
      top_words: this.state.temp_top.sort((a, b) =>
        a.count > b.count ? -1 : a.count < b.count ? 1 : 0
      ),
    });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-around",
        }}
      >
        <div>{"Text: " + this.state.ori_text}</div>
        <div>{"TOP WORDS:"}</div>
        {this.state.top_words[0] !== undefined ? (
          <div>
            <div>
              {"1: " +
                this.state.top_words[0].id +
                " (" +
                this.state.top_words[0].count +
                ")"}
            </div>
            <div>
              {"2: " +
                this.state.top_words[1].id +
                " (" +
                this.state.top_words[1].count +
                ")"}
            </div>
            <div>
              {"3: " +
                this.state.top_words[2].id +
                " (" +
                this.state.top_words[2].count +
                ")"}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Main;
