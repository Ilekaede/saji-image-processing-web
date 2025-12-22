import { MethodContent } from "../types/method";
import { methodsMetadata } from "../data/methodsMetadata";

/**
 * メソッドコンテンツを取得する関数
 * 静的インポートにより、Tree Shakingが有効化される
 */
export const generateMethodContents = (): MethodContent[] => {
  return methodsMetadata;
};

