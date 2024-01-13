import { useState } from "react";




export default function App() {
  const [items, setItems] = useState([]);


  function HandleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter(item => item.id !== id))

  }

  function handlePacked(id) {
    setItems(items => items.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  }


  return <div>
    <Logo />
    <Form onAddItems={HandleAddItems} />
    <List items={items} onDeleteItems={handleDeleteItem} onToggleItems={handlePacked} />
    <Stat items={items} />
  </div>
}

function Logo() {
  return <h1>🌴Far Away👜</h1>

}

function Form({ onAddItems }) {

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");


  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    const newItems = { description, quantity, packed: false, id: Date.now() };
    console.log(newItems);

    onAddItems(newItems);
    setDescription('');
    setQuantity(1);
  }


  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What Do You Need For Trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => <option value={num} key={num} >{num}</option>)}
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)} />
      <button>ADD</button>
    </form >
  );
}

function List({ items, onDeleteItems, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {
          items.map((item) => (<Item item={item} onDeleteItems={onDeleteItems} onToggleItems={onToggleItems} key={item.id} />))
        }
      </ul>
    </div>
  );

}

function Item({ item, onDeleteItems, onToggleItems }) {


  return <li>
    <input type="checkbox" value={item.packed} onChange={() => onToggleItems(item.id)} />
    <span style={item.packed ? { textDecoration: "line-through" } : {}}>
      {item.quantity}{" "}{item.description}


    </span>
    <button onClick={() => onDeleteItems(item.id)}>❌</button>
  </li>
}
function Stat({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;


  return (<footer className="stats">
    <em>

      You have {numItems} items on your list, and you already packed {numPacked}  ({Math.round((numPacked / numItems) * 100)})
    </em >
  </footer>
  );
}

