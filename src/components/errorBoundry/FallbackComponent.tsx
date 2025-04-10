interface FallbackComponentProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function FallbackComponent({
  error,
  resetErrorBoundary,
}: FallbackComponentProps) {
  return (
    <div role="alert">
      <p>Something went wrong</p>
      <pre className="fallback-error" style={{ color: "red" }}>
        {error.message}
      </pre>
    </div>
  );
}

export default FallbackComponent;
