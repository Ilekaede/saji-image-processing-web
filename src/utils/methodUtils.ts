import { MethodContent } from "../types/method";

// メソッドファイルから情報を抽出する関数
export const extractMethodInfo = (content: string): Partial<MethodContent> => {
  const titleMatch = content.match(/<Text as="h1".*?>(.*?)<\/Text>/);
  const overviewMatch = content.match(/<Text fontSize="xl".*?>(.*?)<\/Text>/);

  return {
    title: titleMatch ? titleMatch[1].trim() : "",
    overview: overviewMatch ? overviewMatch[1].trim() : "",
  };
};

// メソッドコンテンツを動的に収集する関数
export const generateMethodContents = (): MethodContent[] => {
  const methodContents: MethodContent[] = [];
  let methodIndex = 1;

  while (true) {
    try {
      // メソッドファイルのインポートを試みる
      const methodModule =
        require(`../content/Method${methodIndex}`).methodMetadata;
      methodContents.push({
        id: methodModule.id,
        title: methodModule.title,
        overview: methodModule.overview,
        tags: methodModule.tags,
        image: methodModule.image,
      });
      methodIndex++;
    } catch (error) {
      // ファイルが見つからない場合はループを終了
      break;
    }
  }

  return methodContents;
};
