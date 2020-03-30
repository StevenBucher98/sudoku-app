import React, { Component } from "react";
import Cell from "./cell";
import PropTypes from "prop-types";

class block extends Component {
  state = {};

  handleUpdateFilled = () => {
    this.props.updatedFilled();
  };
  // Set prop to the cells passed
  render() {
    console.log("block props: ", this.props);
    return (
      <div className="block-grid">
        {this.props.cells.map(cell => (
          <Cell key={cell.id} value={cell} fill={this.handleUpdateFilled} />
        ))}
      </div>
    );
  }
}

block.propTypes = {
  updatedFilled: PropTypes.func
};
export default block;
