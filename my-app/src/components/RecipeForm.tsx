import React, { useState } from "react";

export interface Ingredient {
  name: string; // 材料名
  amount: string; // 分量
}
// フォームが送信されたらこれらの情報を受け取る
interface RecipeFormProps {
  onSubmit: (
    ingredients: Ingredient[],
    originalServings: number,
    newServings: number
  ) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", amount: "" },
  ]);
  const [originalServings, setOriginalServings] = useState<number>(4); // 初期値は4人分
  const [newServings, setNewServings] = useState<number>(1); // 初期値は1人分

  // 材料の変更処理
  const handleIngredientChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
    };
    setIngredients(updatedIngredients);
  };

  // 材料追加
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  // フォームが送信されたときに呼び出される関数
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(ingredients, originalServings, newServings);
  };

  return (
    <form onSubmit={handleSubmit}>
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="材料名"
            value={ingredient.name}
            onChange={(e) =>
              handleIngredientChange(index, "name", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="分量"
            value={ingredient.amount}
            onChange={(e) =>
              handleIngredientChange(index, "amount", e.target.value)
            }
          />
        </div>
      ))}
      <button type="button" onClick={handleAddIngredient}>
        材料を追加
      </button>

      <div>
        <label>元の人数:</label>
        <input
          type="number"
          value={originalServings}
          onChange={(e) => setOriginalServings(Number(e.target.value))}
        />
      </div>

      <div>
        <label>新しい人数:</label>
        <input
          type="number"
          value={newServings}
          onChange={(e) => setNewServings(Number(e.target.value))}
        />
      </div>

      <button type="submit">計算</button>
    </form>
  );
};

export default RecipeForm;
