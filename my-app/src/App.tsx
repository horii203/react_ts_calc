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
      <h1>レシピ分量計算アプリ</h1>
      <RecipeForm onSubmit={handleFormSubmit} />
      {ingredients.length > 0 && (
        <RecipeResult
          ingredients={ingredients}
          originalServings={originalServings}
          newServings={newServings}
        />
      )}
    </>
  );
};

export default App;
