import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MethodDetail = () => {
  const { id } = useParams<{ id: string }>(); //idをURLから取得する
  const [Component, setComponent] = useState<React.FC | null>(null);

  useEffect(() => {
    import(`../../content/Method${id}.tsx`)
      .then((module) => {
        setComponent(() => module.default);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return <div>{Component ? <Component /> : <p>Loading...</p>}</div>;
};

export default MethodDetail;
