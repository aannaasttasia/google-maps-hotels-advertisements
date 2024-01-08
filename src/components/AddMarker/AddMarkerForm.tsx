import React, { useState } from "react";
import { CoordinatesType } from "../../dataTypes";
import "./css/AddMarkerForm.scss";

const AddMarkerFormComponent = ({
  onSave,
  position,
  onClose,
}: {
  onSave: any;
  position: CoordinatesType;
  onClose: any;
}) => {
  const [title, setTitle] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");
  const [price, setPrice] = useState<number | string>("");

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onImgUrlChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setImgUrl(e.target.value);
  const onPriceChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPrice(Number(e.target.value));

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(title, imgUrl, price);
    onSave({ title, imgUrl, price, position });
    setTitle("");
    setImgUrl("");
    setPrice(0);
  };

  return (
    <section className="form">
        <h1 className="form__name">Fill in the form to add new hotel:</h1>
        <aside className="form__fields">
            <label>
                <input
                type="text"
                name="title"
                value={title}
                onChange={onTitleChanged}
                placeholder="Title"
                />
            </label>
            <br />

            <label>
                <input
                type="text"
                name="imgUrl"
                value={imgUrl}
                onChange={onImgUrlChanged}
                placeholder="Image url"

                />
            </label>
            <br />

            <label>
                <input
                type="text"
                name="price"
                value={price}
                onChange={onPriceChanged}
                placeholder="Price"
                />
            </label>
            <br />
            <button onClick={handleSave}>Save</button>
            <a className="close" onClick={onClose}/>
        </aside>
    </section>
  );
};

export default AddMarkerFormComponent;
