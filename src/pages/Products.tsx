import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { getProducts,  type Product } from "../api/product";
import { useDebounce } from "../hooks/useDebounce";
import CheckoutPreviewModal from "../components/CheckoutPreviewModal";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedProduct, setSelectedProduct] =
        useState<{ id: number; name: string } | null>(null);

    const [page, setPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(1);
    const [search, setSearch] = useState<string>("");

    const perPage = 9;

    // 🔑 debounce search
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);

            try {
                const res = await getProducts({
                    page,
                    per_page: perPage,
                    search: debouncedSearch,
                });

                const pagination = res.data.data;
                setProducts(pagination.data);
                setLastPage(pagination.last_page);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, debouncedSearch]); // ⬅️ PENTING

    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Products</h1>

                <input
                    type="text"
                    placeholder="Search product..."
                    className="border px-4 py-2 rounded-lg"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1); // reset page saat search berubah
                    }}
                />
            </div>

            {loading ? (
                <div>Loading products...</div>
            ) : products.length === 0 ? (
                <div className="text-gray-500">No product found</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onChoose={() =>
                                    setSelectedProduct({
                                        id: product.id,
                                        name: product.name,
                                    })
                                }
                            />

                        ))}
                    </div>

                    <Pagination
                        current={page}
                        last={lastPage}
                        onChange={setPage}
                    />
                </>
            )}

            {selectedProduct && (
                <CheckoutPreviewModal
                    productId={selectedProduct.id}
                    productName={selectedProduct.name}
                    onClose={() => setSelectedProduct(null)}
                />
            )}

        </DashboardLayout>
    );
}