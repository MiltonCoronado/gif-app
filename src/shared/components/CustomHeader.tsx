interface Props {
  title: string;
  description?: string;
}

const CustomHeader = ({ title, description }: Props) => {
  return (
    <header className="content-center">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  );
};

export { CustomHeader };
