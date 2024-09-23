import React, { useState } from "react";
import RecipeForm from "./components/RecipeForm";
import RecipeResult from "./components/RecipeResult";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  h1 {
    text-align: center;
    color: #ff9447;
  }
`;
const About = styled.div`
  position: relative;
  background-color: #fff;
  padding: 50px;
  margin-top: 100px;
  line-height: 1.5;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  &::before {
    position: absolute;
    content: "";
    top: -35px;
    width: 150px;
    height: 35px;
    opacity: 0.7;
    background-color: #ff99ac;
    background-image: radial-gradient(#fff 24%, transparent 0),
      radial-gradient(#fff 24%, transparent 0);
    background-position: 0 0, 10px 10px;
    background-size: 20px 20px;
    transform: rotate(-15deg) translateX(-50%);
    left: 50%;
  }
`;

const App: React.FC = () => {
  // 材料
  const [ingredients, setIngredients] = useState<
    { name: string; amount: string }[]
  >([]);
  // 元の人数
  const [originalServings, setOriginalServings] = useState<number>(0);
  // 新しい人数
  const [newServings, setNewServings] = useState<number>(0);

  // フォームから送信されたデータを基に状態を更新
  const handleFormSubmit = (
    submittedIngredients: { name: string; amount: string }[], // 材料
    original: number, // 元の人数
    newAmount: number // 新しい人数
  ) => {
    setIngredients(submittedIngredients);
    setOriginalServings(original);
    setNewServings(newAmount);
  };

  return (
    <Container>
      <h1>分量計算ツール</h1>

      {/* RecipeFormに、handleFormSubmitという関数をonSubmitという名前のpropsとして渡す */}
      <RecipeForm onSubmit={handleFormSubmit} />

      {ingredients.length > 0 && (
        <RecipeResult
          ingredients={ingredients}
          originalServings={originalServings}
          newServings={newServings}
        />
      )}

      <About>
        <p>
          【概要】
          <br />
          レシピの分量を作りたい人数に合わせて計算するツールです。
          <br />
          <br />
          【使い方】
          <br />
          1.材料名と分量を入力します。
          <br />
          　※分量は半角で整数または小数で入力してください。
          <br />
          2.元の分量と新しい分量を入力します。
          <br />
          3.「計算」をクリックすると結果が表示されます。
        </p>
      </About>
    </Container>
  );
};

export default App;
