export default function LoadingSpinner() {
  return (
    <div className="flex min-h-100 items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-zinc-100"></div>
    </div>
  );
}
