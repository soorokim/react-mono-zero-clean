import { TStringRemove } from "./types";

const strategy = {
  start: (target: string, findIndex: number) => target.slice(findIndex + 1, target.length),
  base: (target: string, findIndex: number) => target.slice(0, findIndex) + target.slice(findIndex + 1, target.length),
  end: (target: string, findIndex: number) => target.slice(0, findIndex),
};

const removeStringByType = (target: string, type: TStringRemove, findIndex: number) => {
  // if(type === "start" ) target.slice(findIndex + 1, target.length);
  // else if(type === "base") target.slice(0, findIndex) + target.slice(findIndex + 1, target.length);
  // else target.slice(0, findIndex)
  const strategyFnc = strategy[type];
  return strategyFnc(target, findIndex);
};

/**
 * type:start - 찾은 문자열을 시작으로 끝 문자열까지 반환(target: "?", value:"react?kim", result="kim")
 * type:base - 찾은 문자열 하나만 삭제(target: "?", value:"react?kim", result="reactkim")
 * type:end - 첫번째 위치부터 찾은 문자열 위치에 포함되는 문자열 삭제(target: "?", value:"react?kim", result="asf")
 * @param target 삭제할 문자열
 * @returns {string}
 */
export const remove = (target: string) => (type: TStringRemove) => (value: string) => {
  const findIndex = value.indexOf(target);
  if (findIndex === -1) return value;

  return removeStringByType(value, type, findIndex);
};
