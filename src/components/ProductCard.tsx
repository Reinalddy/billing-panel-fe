import type { Product } from "../api/product";

interface ProductCardProps {
    product: Product;
    onChoose: () => void;
}

export default function ProductCard({
    product,
    onChoose,
}: ProductCardProps) {
    return (
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-1">
                {product.name}
            </h3>

            <p className="text-gray-500 text-sm mb-4">
                {product.description}
            </p>

            <div className="flex items-center justify-between">
                <span className="text-indigo-600 font-bold">
                    Rp {product.price.toLocaleString()}
                </span>

                <button
                    onClick={onChoose}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                    Choose
                </button>
            </div>
        </div>
    );
}