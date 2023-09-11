import React, { useState } from "react";

export const User = ({
    title, price, offer_price, description, product_type, tags, file,
    id, onEdit, onDelete
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const handleEdit = () => {
        setIsEdit(!isEdit)
    };
    const handleDelete = () => {
        onDelete(id);
    };
    const handleOnEditSubmit = (evt) => {
        evt.preventDefault();
        onEdit(id, evt.target.title.value,
            evt.target.price.value, evt.target.offer_price.value, evt.target.description.value,
            evt.target.product_type.value, evt.target.tags.value, evt.target.file.value);
        setIsEdit(!isEdit)
    }
    return (
        <div>
            {isEdit ? (
                <form onSubmit={handleOnEditSubmit}>
                    <input type="text" placeholder="title" name="title" defaultValue={title} />
                    <input placeholder="price" name="price" defaultValue={price} />
                    <input placeholder="offer_price" name="offer_price" defaultValue={offer_price} />
                    <input placeholder="description" name="description" defaultValue={description} />
                    <input placeholder="product_type" name="product_type" defaultValue={product_type} />
                    <input placeholder="tags" name="tags" defaultValue={tags} />
                    <input placeholder="file" name="file" defaultValue={file} />
                    <button onSubmit={handleOnEditSubmit}>save</button>

                </form>
            ) : (
                <div className="user">
                    <span className="user-name">{title}</span>
                    <span className="user-email">{price}</span>
                    <span className="user-name">{offer_price}</span>
                    <span className="user-name">{description}</span>
                    <span className="user-name">{product_type}</span>
                    <span className="user-name">{tags}</span>
                    <span className="user-name">{file}</span>
                    <div>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    )
}