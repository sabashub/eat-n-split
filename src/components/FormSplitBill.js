import { useState } from "react";
import Button from "./Button";

export default function FormSplitBill({ selectedFriend, handleSplit }) {
  const [bill, setBill] = useState("");

  const [paidByUser, setPayedByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    handleSplit(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>split a bill with {selectedFriend.name}</h2>
      <label>💰 Bill value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧑 Your Expense</label>
      <input
        type="number"
        min={0}
        value={paidByUser}
        onChange={(e) =>
          setPayedByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>👯‍♂️ {selectedFriend.name}'s expence</label>
      <input type="text" disabled value={paidByFriend} />

      <label>💸 who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="user">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
