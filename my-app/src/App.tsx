import React, { useState } from "react";
import RecipeForm from "./components/RecipeForm";
import RecipeResult from "./components/RecipeResult";

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
    <>
      <h1>分量計算</h1>

      {/* RecipeFormに、handleFormSubmitという関数をonSubmitという名前のpropsとして渡す */}
      <RecipeForm onSubmit={handleFormSubmit} />

      {ingredients.length > 0 && (
        <RecipeResult
          ingredients={ingredients}
          originalServings={originalServings}
          newServings={newServings}
        />
      )}

      <p>
        【概要】
        <br />
        レシピの分量を作りたい人数に合わせて計算するツールです。
        <br />
        【使い方】
        <br />
        1.材料名と分量を入力する
        <br />
        　※分量は半角で整数または小数で入力してください。
        <br />
        2.元の分量と新しい分量を入力する
        <br />
        3.「計算」をクリックすると結果が表示される
      </p>
    </>
  );
};

export default App;
