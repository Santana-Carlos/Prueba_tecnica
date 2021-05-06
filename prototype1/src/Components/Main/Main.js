import React, { Component } from "react";
import { FormControlLabel, SvgIcon } from "@material-ui/core";
import { ReactComponent as IconChili } from "../../Assets/chili.svg";
import {
  StyledContainer,
  OrangeButton,
  StyledInput,
  StyledTextField,
  StyledCheckbox,
} from "../StyledComponents";
import {
  Chart,
  Series,
  ArgumentAxis,
  ValueAxis,
  Legend,
  Tick,
  Label,
  Margin,
  Grid,
  LoadingIndicator,
} from "devextreme-react/chart";
import "./Main.css";

class Main extends Component {
  constructor(props) {
    super(props);
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
      set_parags: 1,
      set_lorem: false,
    };
  }

  componentDidMount() {
    this.callApi();
  }

  callApi = () => {
    console.log(
      process.env.REACT_APP_API_URL +
        "?type=meat-and-filler&paras=" +
        this.state.set_parags +
        (this.state.set_lorem ? "&start-with-lorem=1" : "") +
        "&format=json"
    );
    fetch(
      process.env.REACT_APP_API_URL +
        "?type=meat-and-filler&paras=" +
        this.state.set_parags +
        (this.state.set_lorem ? "&start-with-lorem=1" : "") +
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
          for (let i = 0; i < data.length; i++)
            temp_text = temp_text + data[i] + "\n \n";

        this.setState({ ori_text: temp_text }, this.splitWords);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  splitWords = () => {
    //normalize text, removing puntuation, line breaks and lower casing the whole string
    let temp_oritext = this.state.ori_text;
    let temp_text = temp_oritext.toLowerCase().replace(/[.,]|\n/g, " ");

    let temp_words = temp_text.split(" ").filter((x) => x !== ""); //split string into words (array)

    //counting parags words and chars
    this.setState({
      set_words: temp_words.length,
      set_chars: temp_oritext.length,
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
    this.setState(
      {
        top_words: this.state.temp_top.sort((a, b) =>
          a.count > b.count ? -1 : a.count < b.count ? 1 : 0
        ),
      },
      this.resetWords
    );
  };

  resetWords = () => {
    this.setState({
      temp_top: [
        {
          id: "control_value",
          count: 0,
        },
      ],
    });
  };

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const check = e.target.checked;

    switch (name) {
      case "input_set_parags":
        this.setState({ set_parags: value });
        break;
      case "input_set_lorem":
        this.setState({ set_lorem: check });
        break;
      default:
        break;
    }
  };

  render() {
    const data =
      this.state.top_words[0] === undefined
        ? [{ id: "", count: 0 }]
        : this.state.top_words.slice(0, 3);

    return (
      <StyledContainer maxWidth="md">
        {/* Title */}
        <div className="o-title">
          {"Let's get spicy"}
          <SvgIcon
            viewBox="0 0 520 520"
            component={IconChili}
            style={{
              color: "#ff5f58",
              margin: "0.6rem 0 0 0.8rem",
              height: "2rem",
              width: "2rem",
              transform: "rotate(-20deg)",
            }}
          />
        </div>
        <div className="o-normaltext">{"Bacon Ipsum Generator"}</div>

        {/* Bar chart */}
        <div className="o-chartcontainer">
          <div className="o-row" style={{ flexWrap: "wrap" }}>
            <div
              className="o-subtitle o-subtitlespace"
              style={{ marginRight: "4rem" }}
            >
              {"TOTAL WORDS: " + this.state.set_words}
            </div>
            <div className="o-subtitle o-subtitlespace">
              {"TOTAL CHARACTERS: " + this.state.set_chars}
            </div>
          </div>
          <div className="o-subtitle o-subtitlespace">
            {"HISTOGRAM TOP 3 WORDS:"}
          </div>

          <Chart className="o-chart" dataSource={data}>
            <LoadingIndicator
              enabled={true}
              font={{ color: "#6f6f6f", size: 25 }}
            />
            <Series
              valueField="count"
              argumentField="id"
              type="bar"
              color="#bdbdbd"
            />
            <ArgumentAxis color="#e9e9e9" width={1}>
              <Tick visible={false} />
              <Label indentFromAxis={1} font={{ size: 16 }} />
            </ArgumentAxis>
            <ValueAxis tickInterval={data[0].count} color="#e9e9e9" width={1}>
              <Grid visible={false} />
              <Tick visible={false} />
              <Label indentFromAxis={2} font={{ size: 16 }} />
            </ValueAxis>
            <Margin top={20} left={20} right={20} bottom={10} />
            <Legend visible={false} />
          </Chart>
        </div>

        {/* Options and textfield */}
        <div className="o-ipsumcontainer">
          <div className="o-toolscontainer o-subtitle">
            <div className="o-row" style={{ margin: "0.6rem 2rem 0.6rem 0" }}>
              {"# PARAGRAPHS: "}
              <StyledTextField
                type="number"
                name="input_set_parags"
                value={this.state.set_parags || ""}
                onChange={this.handleChange}
                variant="outlined"
                size="small"
              />
            </div>
            <FormControlLabel
              style={{ margin: "0.6rem 2rem 0.6rem 0" }}
              control={
                <StyledCheckbox
                  checked={this.state.set_lorem || false}
                  color="primary"
                  name="input_set_lorem"
                  onChange={this.handleChange}
                />
              }
              label={<p className="o-subtitle">{"STARTS WITH LOREM"}</p>}
              labelPlacement="start"
            />
            <div className="o-orangebutton">
              <OrangeButton
                onClick={() => {
                  this.callApi();
                }}
              >
                {"GENERATE!"}
              </OrangeButton>
            </div>
          </div>
          <StyledInput
            multiline={true}
            readOnly={true}
            value={this.state.ori_text.slice(1)}
            rows={7}
            variant="outlined"
            fullWidth={true}
          />
        </div>

        <div className="o-credits">
          {"Bacon Ipsum Consumer v" +
            process.env.REACT_APP_VERSION +
            " 2021 - " +
            "Diego Andrés Colmenares"}
          <br />
          {
            "Other Credits: Icon made by FreePik from www.flaticon.com, BarChart from js.devexpress.com"
          }
        </div>
      </StyledContainer>
    );
  }
}

export default Main;
