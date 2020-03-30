import React, { Component } from "react";
import "./cell.css";
import PropTypes from "prop-types";

class Cell extends Component {
  state = {
    value: this.props.value.val,
    id: this.props.value.id,
    filled: this.props.value.filled,
    style: "cell-css",
    soln: this.props.value.soln
  };

  handleChange = event => {
    let x = parseInt(event.target.value);
    this.setState({ value: x });
    if (x === this.state.soln) {
      this.setState({ filled: true });
      this.setState({ style: "cell-css" });
      this.props.fill();
    }
    // else if (this.state.value === NaN) {
    //   this.setState({ style: "cell-css" });
    // }
    else {
      this.setState({ style: "wrong" });
    }
  };

  render() {
    //console.log("Cell props: ", this.props);
    //console.log("Cell State:", this.state);
    return (
      <div>
        {this.state.filled ? (
          <input
            disabled
            type="number"
            id="cell-css"
            value={this.state.value ? this.state.value : " "}
            onChange={this.handleChange}
          />
        ) : (
          <input
            type="number"
            id={this.state.style}
            value={this.state.value ? this.state.value : " "}
            onChange={this.handleChange}
          />
        )}
      </div>
    );
  }
}

Cell.propTypes = {
  fill: PropTypes.func
};

export default Cell;
