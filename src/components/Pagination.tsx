interface PaginationProps {
    current: number;
    last: number;
    onChange: (page: number) => void;
}

export default function Pagination({
    current,
    last,
    onChange,
}: PaginationProps) {
    if (last <= 1) return null;

    return (
        <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: last }).map((_, i) => {
                const page = i + 1;
                return (
                    <button
                        key={page}
                        onClick={() => onChange(page)}
                        className={`px-4 py-2 rounded-lg border
              ${page === current
                                ? "bg-indigo-600 text-white"
                                : "bg-white hover:bg-gray-100"
                            }`}
                    >
                        {page}
                    </button>
                );
            })}
        </div>
    );
}