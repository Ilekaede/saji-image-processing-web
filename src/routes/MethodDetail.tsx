import React from "react";
import { useParams } from "react-router-dom";

const MethodDetail = () => {
  const { id } = useParams<{ id: string }>(); //idをURLから取得する

  console.log(id);
  //idに基いたデータ処理とか，API叩くとかここでできるよ
  const methods = [
    { id: 1, title: "2値化", description: "2値化の記事をここに書く" },
    { id: 2, title: "特徴点抽出", description: "特徴点抽出の記事をここに書く" },
    {
      id: 3,
      title: "深層学習と画像処理",
      description: "深層学習の記事をここに書く",
    },
    { id: 4, title: "ハフ変換", description: "ハフ変換の記事" },
  ];

  const method = methods.find((m) => m.id.toString() === id);

  if (!method) {
    return <p>No method found with id: {id}.</p>;
  }

  return (
    <div>
      <h1>{method.title}</h1>
      <p>{method.description}</p>
    </div>
  );
};

export default MethodDetail;