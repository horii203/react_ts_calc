import React from "react";
import styled from "styled-components";

// propsの型を定義
interface RecipeResultProps {
  ingredients: { name: string; amount: string }[];
  originalServings: number;
  newServings: number;
}

const Result = styled.div`
  p {
    position: relative;
    font-size: 18px;
    background-color: #ff9447;
    color: #fff;
    display: inline-block;
    padding: 5px 30px;
    border-radius: 100px;
    &:after {
      position: absolute;
      content: "";
      top: 100%;
      left: 30px;
      width: 1px;
      height: 1px;
      border-top: #ff9447 solid 8px;
      border-left: transparent solid 5px;
      border-right: transparent solid 5px;
    }
  }
`;

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
    <Result>
      <p>計算結果</p>
      <ul>
        {ingredients
          .filter((ingredient) => ingredient.name.trim() !== "") // 材料名が空でないか確認
          .map((ingredient, index) => (
            <li key={index}>
              {ingredient.name}：{calculateAmount(ingredient.amount)}
            </li>
          ))}
      </ul>
    </Result>
  );
};

export default RecipeResult;
