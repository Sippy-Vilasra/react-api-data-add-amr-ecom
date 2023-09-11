import React from "react";

export const AddUser = ({ onAdd }) => {
    const handleOnSubmit = (evt) => {
        evt.preventDefault();
        onAdd(evt.target.title.value,
            evt.target.price.value, evt.target.offer_price.value, evt.target.description.value,
            evt.target.product_type.value, evt.target.tags.value, evt.target.file.value);
        evt.target.title.value = "";
        evt.target.price.value = "";
        evt.target.offer_price.value = "";
        evt.target.description.value = "";
        evt.target.product_type.value = "";
        evt.target.tags.value = "";
        evt.target.file.value = "";
    };
    return (
        <form onSubmit={handleOnSubmit}>
            <h3>Add User</h3>
            <input type="text" placeholder="title" name="title" />
            <input placeholder="price" name="price" />
            <input placeholder="offer_price" name="offer_price" />
            <input placeholder="description" name="description" />
            <input placeholder="product_type" name="product_type" />
            <input placeholder="tags" name="tags" />
            <input placeholder="file" name="file" />
            <button onSubmit={handleOnSubmit}>Add</button>

        </form>
    )
}