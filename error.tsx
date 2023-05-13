const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div>
      {error.message}
      <button onClick={reset}>try again!</button>
    </div>
  );
};

export default Error;
