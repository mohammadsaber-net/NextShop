interface StatCardProps {
  title: string
  value: string | number
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className={`rounded-xl bg-zinc-100 p-6 dark:bg-gray-700 dark:text-cyan-400 shadow-sm border border-gray-300`}>
      <p className="text-sm">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  )
}
