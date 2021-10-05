import { Sticky, StickyProvider } from "@project/design-systems/src/Sticky";
import { generatePath, Link } from "react-router-dom";
import routes from "routes";

type DummyDivProps = {
  text: string;
  color: string;
};
const DummyDiv = ({ text, color }: DummyDivProps) => (
  <div style={{ height: "1000px", backgroundColor: color }}>{text}</div>
);

type StickyHeaderProps = {
  style: React.CSSProperties;
  children: React.ReactNode;
};
const containerBg = (i: number) => `hsl(${i * 40}, 70%, 90%)`;
const headerBg = (i: number) => `hsl(${i * 40}, 70%, 50%)`;

const TestDefaultStyle: React.CSSProperties = {
  color: "black",
  height: "40px",
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "bold",
};
const StickyHeader = ({ style, children }: StickyHeaderProps) => <div style={style}>{children}</div>;
function Home() {
  const test = generatePath("/user/:id/:entity(posts|comments)", {
    id: "test",
    entity: "posts",
  });

  console.log("test:", test);
  return (
    <div>
      <div>
        Home 입니다
        <div>
          <Link to={generatePath(routes.auth.regexPath, { entity: "a" })}>이동</Link>
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <StickyProvider key={i}>
            <Sticky>
              <StickyHeader style={{ ...TestDefaultStyle, background: headerBg(i) }}>hi</StickyHeader>
            </Sticky>
            <DummyDiv text="Context Sticky" color={containerBg(i)} />
          </StickyProvider>
        ))}
      </div>
    </div>
  );
}

export default Home;
