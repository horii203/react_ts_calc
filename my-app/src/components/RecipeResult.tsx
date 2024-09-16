import React from "react";
import { Ingredient } from "./RecipeForm";

interface RecipeResultProps {
  ingredients: Ingredient[];
  originalServings: number;
  newServings: number;
}

const RecipeResult: React.FC<RecipeResultProps> = ({
  ingredients,
  originalServings,
  newServings,
}) => {
  const calculateAmount = (amount: string): string => {
    // 数値部分と単位部分を抽出
    const numberPattern = /([0-9.]+)/g;

    // 数値と単位を抽出
    const numbers = amount.match(numberPattern);

    // 数値部分を合計
    const quantity = numbers
      ? numbers.reduce((acc, num) => acc + parseFloat(num), 0)
      : 0;

    // 計算
    const calculatedAmount = (
      (quantity / originalServings) *
      newServings
    ).toFixed(2);

    // 数値部分の位置を元の位置に戻す
    let result = amount;
    if (numbers) {
      numbers.forEach((num) => {
        result = result.replace(num, calculatedAmount);
      });
    }

    return result;
  };

  return (
    <>
      <h2>変換後の材料</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name}: {calculateAmount(ingredient.amount)}
          </li>
        ))}
      </ul>
    </>
  );
};

export default RecipeResult;
