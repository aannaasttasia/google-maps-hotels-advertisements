import * as React from "react";
import { Component } from "react";
import { MarkerType } from "../../dataTypes";
import './css/Marker.scss'


export class MarkerComponent extends Component<{ marker: MarkerType }> {
  constructor(props: { marker: MarkerType }) {
    super(props);
  }

  render() {
    return (
      <aside key={this.props.marker.id} className="hotel">
        <figure className="hotel__img-wrapper">
            <img src={this.props.marker.imgUrl} alt=""  className="hotel__img"/>
        </figure>
        <h1 className="hotel__title">{this.props.marker.title}</h1>
        <figcaption className="hotel__price"> UAH {this.props.marker.price}</figcaption>
      </aside>
    );
  }
}
