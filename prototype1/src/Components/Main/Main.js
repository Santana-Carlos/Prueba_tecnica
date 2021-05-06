import React, { Component } from "react";
import { Container, SvgIcon } from "@material-ui/core";
import { ReactComponent as IconChili } from "../../Assets/chili.svg";
import {
  Chart,
  Series,
  ArgumentAxis,
  ValueAxis,
  Legend,
  Tick,
  Label,
  Grid,
  LoadingIndicator,
} from "devextreme-react/chart";
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
      set_parags: 2,
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
        //console.log(data);
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
    const data =
      this.state.top_words[0] === undefined
        ? [{ id: "", count: 0 }]
        : this.state.top_words.slice(0, 3);

    const chartOptions = {
      height: 120,
      axisX: {
        lineThickness: 0.2,
        tickLength: 0,
      },
      axisY: {
        includeZero: true,
        lineThickness: 0.2,
        tickLength: 0,
        gridColor: "#fff",
        maximum: data[0].count,
        interval: data[0].count,
      },
      data: [
        {
          type: "column",
          dataPoints: data.map((x) => {
            return {
              label: x.id.charAt(0).toUpperCase() + x.id.slice(1),
              y: x.count,
              color: "#bdbdbd",
            };
          }),
        },
      ],
    };

    return (
      <Container maxWidth="xs">
        <div className="o-title">
          {"Let's get spicy"}
          <SvgIcon
            component={IconChili}
            viewBox="-180 60 700 300"
            style={{ color: "#ff5f58" }}
          />
        </div>
        <div className="o-normaltext">{"Bacon Ipsum Generator"}</div>
        <div className="o-chartcontainer">
          <div className="o-subtitle">
            {"TOTAL WORDS: " +
              this.state.set_words +
              " - TOTAL CHARACTERS: " +
              this.state.set_chars}
          </div>
          <div className="o-subtitle">{"HISTOGRAM TOP 3 WORDS:"}</div>

          <div className="o-chart">
            <Chart dataSource={data}>
              <Series
                valueField="count"
                argumentField="id"
                type="bar"
                barWidth={50}
                barPadding={0.1}
                barGroupPadding={0.1}
                color="#bdbdbd"
              />
              <ArgumentAxis>
                <Tick visible={false} />
                <Label indentFromAxis={1} font={{ size: 9 }} />
              </ArgumentAxis>
              <ValueAxis tickInterval={data[0].count}>
                <Grid visible={false} />
                <Tick visible={false} />
                <Label indentFromAxis={1} font={{ size: 9 }} />
              </ValueAxis>
              <Legend visible={false} />
              <LoadingIndicator
                enabled={this.state.top_words[0] === undefined}
              />
            </Chart>
          </div>
        </div>

        <div className="o-normaltext">{"Text: " + this.state.ori_text}</div>
      </Container>
    );
  }
}

export default Main;
