export function SearchBox() {
  return (
    <div className="border-b border-[#d8e3e7] p-3">
      <div className="flex items-center rounded-xl border border-[#cfd9de] bg-white px-4 py-3">
        <input
          type="text"
          readOnly
          placeholder="Search restaurant..."
          className="w-full bg-transparent text-base text-[#5f6c78] outline-none placeholder:text-[#7a8792]"
        />
        <div className="ml-4 h-7 w-px bg-[#d0d8dd]" />
        <ChevronDownIcon />
      </div>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="ml-3 h-6 w-6 text-[#b1bac2]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
