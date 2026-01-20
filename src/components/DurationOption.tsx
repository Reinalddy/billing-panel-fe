interface DurationOptionProps {
    label: string;
    price: number;
    selected: boolean;
    onClick: () => void;
}

export default function DurationOption({
    label,
    price,
    selected,
    onClick,
}: DurationOptionProps) {
    return (
        <button
            onClick={onClick}
            className={`border rounded-xl p-4 text-left transition
        ${selected
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
        >
            <p className="font-semibold">{label}</p>
            <p className="text-sm text-gray-500">
                Rp {price.toLocaleString()} / bulan
            </p>
        </button>
    );
}
