import { Sticky, StickyProvider } from ".";

export default {
  component: Sticky,
  title: "Sticky",
};

// const Template = () => {
//   return <Sticky />;
// };

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

export const Default = () => {
  return (
    <>
      {/* <DummyDiv text="Context before" color="red" /> */}
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <StickyProvider key={i}>
          <Sticky>
            <StickyHeader style={{ ...TestDefaultStyle, background: headerBg(i) }}>hi</StickyHeader>
          </Sticky>
          <DummyDiv text="Context Sticky" color={containerBg(i)} />
        </StickyProvider>
      ))}
    </>
  );
};
// Default.args = {
//   task: {
//     id: "1",
//     title: "Test Task",
//     state: "TASK_INBOX",
//     updatedAt: new Date(2021, 0, 1, 9, 0),
//   },
// };
