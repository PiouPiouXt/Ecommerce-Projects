import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function CartItemDetails({ cartItem, deleteCartItem, loadCart }) {

  const [isQuantityUpdate, setIsQuantityUpdate] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const updateQuantity = async () => {
    if (isQuantityUpdate) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });
      await loadCart();
      setIsQuantityUpdate(false);
    } else {
      setIsQuantityUpdate(true);
    }
  };

  const updateQuantityInput = (event) => {
    setQuantity(event.target.value);
  };


  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: {isQuantityUpdate
              ? <input type="text" className="quantity-textbox" value={quantity}
                onChange={updateQuantityInput}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    updateQuantity();
                  }
                  if (event.key === "Escape") {
                    setQuantity(cartItem.quantity);
                    setIsQuantityUpdate(false);
                  }
                }}
              />
              : <span className="quantity-label">{cartItem.quantity}</span>
            }
          </span>
          <span className="update-quantity-link link-primary"
            onClick={updateQuantity}
          >
            Update
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  );
}

//solve exercice quantity 8f