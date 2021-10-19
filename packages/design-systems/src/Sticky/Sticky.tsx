import { useCallback, useState, useMemo, useRef } from "react";
import { useEvent, useClosetParent } from "@project/react-hooks";
import { ChildHandler, StickyHandler, StickyMode } from "./types";
import TopSticky from "./TopSticky";
import PARENT_SELECTOR from "./parentSelector";
import "./Sticky.scss";

export interface Props {
  children: React.ReactNode;
  /** 상단에 붙을지 하단에 붙을지 결정 */
  mode?: StickyMode;
  /** 상단에서 얼마나 떨어진 상태로 sticky가 진행될지 결정 */
  top?: number;
  /** 하단에서 얼마나 떨어진 상태로 sticky가 진행될지 결정 */
  bottom?: number;
  /** Sticky컴포넌트가 sticky 됐을때 실행할 callback 함수 */
  onStick?: () => void;
  /** Sticky컴포넌트가 unSticky 됐을때 실행할 callback 함수 */
  onUnStick?: () => void;
}

const Sticky = ({ children, top = 0, mode = "top", onStick, onUnStick }: Props) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isAbsolute, setIsIsAbsolute] = useState(false);

  const { parentNode, findParentFrom } = useClosetParent(`.${PARENT_SELECTOR}`);

  // child component에게 넘겨줄 ref
  // 스크롤 이벤트가 발생할시 할 일을 자식에게 위임
  const childRef = useRef<ChildHandler>(null);

  /**
   * sticky상태는 다음과 같이 2가지로 다시 나뉨
   * 1) sticky element가 container bottom영역까지 도달하고 위로 서서히 사라질때
   * 2) sticky element가 계속 screen의 상단에 고정되어있을때
   * 1번과 같은 경우는 position: absolute로 바뀌어야함
   * 2번과 같은 경우는 position: fixed로 바뀌어야함
   */
  const setStickyAndAbsolute = (pIsSticky: boolean, pIsAbsolute: boolean) => {
    setIsSticky(pIsSticky);
    setIsIsAbsolute(pIsAbsolute);
  };

  const handler: StickyHandler = useMemo(
    () => ({
      stickToScreenTop() {
        setStickyAndAbsolute(true, false);
        onStick?.();
      },

      // container bottom를 기준으로해서 sticky를 고정
      stickToContainerBottom() {
        setStickyAndAbsolute(true, true);
        onStick?.();
      },

      unStick() {
        setStickyAndAbsolute(false, false);
        onUnStick?.();
      },
    }),
    [onStick, onUnStick],
  );

  const update = useCallback(() => {
    childRef.current?.update();
  }, []);

  useEvent("scroll", update, { passive: true });
  useEvent("resize", update);

  const render = () => {
    if (mode === "top")
      return (
        <TopSticky
          ref={childRef}
          isAbsolute={isAbsolute}
          isSticky={isSticky}
          top={top}
          parent={parentNode || document.body}
          handler={handler}
        >
          {children}
        </TopSticky>
      );
  };

  return (
    <div ref={findParentFrom} className="sticky-wrap">
      {render()}
    </div>
  );
};

export default Sticky;
