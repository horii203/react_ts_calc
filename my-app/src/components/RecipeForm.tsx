import React, { useState } from "react";
import styled from "styled-components";

// propsの型を定義
interface RecipeFormProps {
  onSubmit: (
    ingredients: { name: string; amount: string }[],
    originalServings: number,
    newServings: number
  ) => void;
}

const Form = styled.form`
  button {
    display: block;
    padding: 10px;
    min-width: 150px;
    background-color: #e7e7e7;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 10px auto;
  }
`;
const Item = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 50px;
  gap: 10px;
  margin-top: 10px;
  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    min-width: 50%;
  }
  button {
    min-width: auto;
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;
const Wrapper = styled.div`
  margin: 50px 0;
  display: grid;
  gap: 10px;
  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 30px;
  }
`;

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit }) => {
  const [ingredients, setIngredients] = useState<
    { name: string; amount: string }[]
  >([{ name: "", amount: "" }]);
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

  // 材料の追加処理
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  // 材料の削除処理
  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  // フォームが送信されたときに呼び出される関数
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ページのリロードを防ぐ
    onSubmit(ingredients, originalServings, newServings); // フォームの入力データを親コンポーネントに渡す
  };

  return (
    <Form onSubmit={handleSubmit}>
      {ingredients.map((ingredient, index) => (
        <Item key={index}>
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
          <button type="button" onClick={() => handleRemoveIngredient(index)}>
            削除
          </button>
        </Item>
      ))}
      <button type="button" onClick={handleAddIngredient}>
        ＋ 材料を追加
      </button>

      <Wrapper>
        <div>
          <label>元の分量：</label>
          <input
            type="number"
            value={originalServings}
            onChange={(e) => setOriginalServings(Number(e.target.value))}
          />
          <span>人前</span>
        </div>

        <div>
          <label>新しい分量：</label>
          <input
            type="number"
            value={newServings}
            onChange={(e) => setNewServings(Number(e.target.value))}
          />
          <span>人前</span>
        </div>
      </Wrapper>

      <button type="submit">計算</button>
    </Form>
  );
};

export default RecipeForm;
