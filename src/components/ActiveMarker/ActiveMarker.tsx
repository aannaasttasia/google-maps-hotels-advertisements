import { Component } from "react";
import { MarkerType } from "../../dataTypes";
import './css/ActiveMarker.scss'


export class ActiveMarker extends Component<{ marker: MarkerType, onClose: any}> {
  constructor(props: { marker: MarkerType, onClose: any }) {
    super(props);
  }

   
  render() {
    return (
      <aside key={this.props.marker.id} className="hotel-active">
        <figure className="hotel-active__img-wrapper">
            <img src={this.props.marker.imgUrl} alt=""  className="hotel-active__img"/>
        </figure>
        <h1 className="hotel-active__title">{this.props.marker.title}</h1>
        <figcaption className="hotel-active__price"> UAH {this.props.marker.price}</figcaption>
        <button className="hotel-active__btn">Rent</button>
        <a className="hotel-active__close" onClick={this.props.onClose}/>
      </aside>
    );
  }
}
