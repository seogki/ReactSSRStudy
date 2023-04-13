import { createContext, useContext } from "react";

const PreloadContext = createContext(null);

export const Preloader = ({ resolve }) => {
  const preloadContext = useContext(PreloadContext);
  if (!preloadContext) return null;
  if (preloadContext.done) return null;

  preloadContext.promises.push(Promise.resolve(resolve()));
  return null;
};

// 예제랑 동일하게 default 상단에 넣으면은 제대로 import 안됨 export default는 맨 마지막에 선언
export default PreloadContext;
