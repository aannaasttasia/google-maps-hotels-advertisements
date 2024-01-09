import { Component } from "react";
import "./css/Map.scss";

export default class Tip extends Component<{ onClose: any }> {
  constructor(props: { onClose: any }) {
    super(props);
  }

  render() {
    return (
      <article className="tip">
        <h1 className="tip__title">How to add a new announcement</h1>
        <div className="tip__tips">
          <p className="tip__info">1.You clicked the button "Add".</p>
          <p className="tip__info" >2.Now put a point on a map to get coordinates.</p>
          <p className="tip__info"> 3.Then fill in the form. </p>
          <p className="tip__info">4.Every time you should click "Add" button to be able to add a new hotel ad.</p>
        </div>
        <button className="tip__close" onClick={this.props.onClose}>
          got it
        </button>
      </article>
    );
  }
}
