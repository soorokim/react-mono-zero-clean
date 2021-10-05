type StickyProps = {
  topOffset?: number;
  children: React.ReactNode;
};

const Sticky = ({ topOffset, children }: StickyProps) => {
  return <div style={{ position: "sticky", top: `${topOffset}px` }}>{children}</div>;
};

Sticky.defaultProps = {
  topOffset: 0,
};

export default Sticky;
