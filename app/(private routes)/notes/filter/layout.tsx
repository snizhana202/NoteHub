type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function NotesLayout({ sidebar, children }: Props) {
  return (
    <div
      style={{
        margin: "-2.5rem -1.5rem",
        width: "calc(100% + 3rem)",
        minHeight: "calc(100% + 5rem)",
        display: "grid",
        gridTemplateColumns: "208px 1fr",
      }}
    >
      <aside style={{ backgroundColor: "#444" }}>{sidebar}</aside>
      <div
        style={{
          borderLeft: "1px solid #dee2e6",
          padding: "2.5rem 1.5rem",
        }}
      >
        {children}
      </div>
    </div>
  );
}
