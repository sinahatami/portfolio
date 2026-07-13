interface GitHubActivityErrorProps {
  error: string;
}

export function GitHubActivityError({ error }: GitHubActivityErrorProps) {
  return (
    <div className="rounded-xl border border-dashed border-red-300 bg-red-50/10 p-8 text-center dark:border-red-800 dark:bg-red-900/10">
      <p className="text-red-600 dark:text-red-400">{error}</p>
    </div>
  );
}
