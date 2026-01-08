import { use } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import type { Product } from '../types/Product.type';
import { getProductById } from '../api/products';

export default function ProductPage() {
  const params = useParams();
  const location = useLocation();
  const { product: locationProduct } = (location.state || {}) as { product?: Product };

  const productId = Number(params.productId);

  const product = locationProduct ?? use(getProductById(productId));

  const generateStars = (rating: number) => {
    const full = Math.floor(rating);
    const empty = 5 - full;

    return (
      <span className="tracking-wider">
        <span>{'★'.repeat(full)}</span>
        <span className="opacity-30">{'★'.repeat(empty)}</span>
        <span className="ml-1 text-xs opacity-70">({rating})</span>
      </span>
    );
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <p>Product not found</p>
        <a href="/" className="mt-4 px-5 py-2 rounded-xl shadow">Back</a>
      </div>
    );
  }

  return (
    <section className="container mx-auto p-6 max-w-4xl">

      <nav className="mb-6">
        <a href="/" className="opacity-70 hover:opacity-100 transition">
          ← Back to products
        </a>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 items-start">

        {/* Images column */}
        <div className="flex flex-col gap-4">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={product.title}
              className="w-full h-64 object-cover rounded-2xl shadow-xl"
            />
          ))}
        </div>

        {/* Info column */}
        <div>
          <span className="inline-block mb-2 text-[10px] uppercase px-2 py-[2px] rounded bg-opacity-5">
            {product.category}
          </span>

          <h1 className="text-3xl font-black mb-1">
            {product.title}
          </h1>

          <p className="text-xs opacity-50 mb-4">
            by {product.brand}
          </p>

          <div className="text-[14px] mb-4">
            {generateStars(product.rating)}
          </div>

          <p className="opacity-80 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-black">
              ${product.price}
            </span>

            {product.discountPercentage > 0 && (
              <span className="text-sm opacity-60">
                -{product.discountPercentage}%
              </span>
            )}
          </div>

          <div className="mt-6 font-bold">
            {product.stock > 0
              ? `${product.stock} items available`
              : "Out of Stock"}
          </div>

        </div>
      </div>

    </section>
  );
}
