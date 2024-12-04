import React, { useState } from "react";
import axios from "axios";

const OrderForm = ({ onOrderComplete }) => {
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    crust: "",
    toppings: [],
    notes: "",
    quantity: 1,
  });

  const [error, setError] = useState("");
  const [price, setPrice] = useState(85.5); // Baz fiyat

  const toppingsList = [
    "Pepperoni",
    "Sosis",
    "Kanada Jambonu",
    "Tavuk İzgara",
    "Soğan",
    "Domates",
    "Mısır",
    "Jalapeno",
    "Ananas",
    "Kabak",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        toppings: checked
          ? [...prev.toppings, value]
          : prev.toppings.filter((topping) => topping !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleQuantityChange = (increment) => {
    setFormData((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + increment),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.size || !formData.crust || formData.toppings.length < 4) {
      setError("Lütfen tüm zorunlu alanları doldurun ve en az 4 malzeme seçin.");
      return;
    }

    const orderData = {
      ...formData,
      total: price + formData.toppings.length * 5,
    };

    axios
      .post("https://reqres.in/api/pizza", orderData)
      .then((response) => {
        console.log("Sipariş Başarılı:", response.data);
        onOrderComplete(response.data);
      })
      .catch((err) => console.error("Sipariş Hatası:", err));
  };

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h2>Position Absolute Acı Pizza</h2>
      <p>85.50₺</p>
      <p>Boyut Seç *</p>
      <div>
        <label>
          <input
            type="radio"
            name="size"
            value="Küçük"
            onChange={handleChange}
          />
          Küçük
        </label>
        <label>
          <input type="radio" name="size" value="Orta" onChange={handleChange} />
          Orta
        </label>
        <label>
          <input
            type="radio"
            name="size"
            value="Büyük"
            onChange={handleChange}
          />
          Büyük
        </label>
      </div>

      <p>Hamur Seç *</p>
      <select name="crust" onChange={handleChange}>
        <option value="">Hamur Kalınlığı</option>
        <option value="İnce">İnce</option>
        <option value="Normal">Normal</option>
        <option value="Kalın">Kalın</option>
      </select>

      <p>Ek Malzemeler (5₺ / Malzeme) *</p>
      <div>
        {toppingsList.map((topping) => (
          <label key={topping}>
            <input
              type="checkbox"
              name="toppings"
              value={topping}
              onChange={handleChange}
            />
            {topping}
          </label>
        ))}
      </div>

      <p>Sipariş Notu</p>
      <textarea
        name="notes"
        placeholder="Siparişe eklemek istediğiniz bir not var mı?"
        onChange={handleChange}
      />

      <div className="quantity-control">
        <button
          type="button"
          onClick={() => handleQuantityChange(-1)}
          disabled={formData.quantity === 1}
        >
          -
        </button>
        <span>{formData.quantity}</span>
        <button type="button" onClick={() => handleQuantityChange(1)}>
          +
        </button>
      </div>

      <div className="order-summary">
        <p>Seçimler: {formData.toppings.length * 5}₺</p>
        <p>Toplam: {(price + formData.toppings.length * 5).toFixed(2)}₺</p>
      </div>

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={formData.toppings.length > 10}>
        Sipariş Ver
      </button>
    </form>
  );
};

export default OrderForm;
