import React from "react";

// propsの型を定義
interface RecipeResultProps {
  ingredients: { name: string; amount: string }[];
  originalServings: number;
  newServings: number;
}

const RecipeResult: React.FC<RecipeResultProps> = ({
  ingredients,
  originalServings,
  newServings,
}) => {
  const calculateAmount = (amount: string): string => {
    // 数値を抽出
    const numbers = amount.match(/([0-9.]+)/g);

    // 数値があれば計算
    if (numbers && numbers.length > 0) {
      const quantity = parseFloat(numbers[0]);

      // 計算
      const calculatedAmount = (
        (quantity / originalServings) *
        newServings
      ).toFixed(1);

      // 数値部分の位置を元の位置に戻す
      let result = amount.replace(numbers[0], calculatedAmount);
      return result;
    }

    // 数値がない場合は元のamountを返す
    return amount;
  };

  return (
    <>
      <h2>変換後の材料</h2>
      <ul>
        {ingredients
          .filter((ingredient) => ingredient.name.trim() !== "") // 材料名が空でないか確認
          .map((ingredient, index) => (
            <li key={index}>
              {ingredient.name}: {calculateAmount(ingredient.amount)}
            </li>
          ))}
      </ul>
    </>
  );
};

export default RecipeResult;
