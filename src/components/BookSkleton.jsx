export default function BookSkleton({ full }) {
  return (
    <li className={`${full ? "w-full" : "min-w-[280px]"}`}>
      <div className="mb-3 rounded-lg bg-gray-200 h-[220px]"></div>

      <div className="px-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    </li>
  );
}
