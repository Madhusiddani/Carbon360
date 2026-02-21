export default function Button({ children, ...props }) {
  return (
    <button
      className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl font-semibold"
      {...props}
    >
      {children}
    </button>
  );
}