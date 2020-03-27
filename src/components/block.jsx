import React, { Component } from "react";
import Cell from "./cell";

class block extends Component {
  state = {};

  // Set prop to the cells passed
  render() {
    //console.log("block props: ", this.props);
    return (
      <div className="block-grid">
        {this.props.cells.map(cell => (
          <Cell key={cell.id} value={cell} />
        ))}
      </div>
    );
  }
}

export default block;
