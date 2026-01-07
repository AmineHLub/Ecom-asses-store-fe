import { use } from 'react'
import { fakeProductsPromise } from '../dummies/Products';
import { Link } from 'react-router-dom';

export default function ProductListDashboard() {

  const products = use(fakeProductsPromise);

  const generateStars = (rating: number) => {
    const full = Math.floor(rating);
    const empty = 5 - full;

    return (
      <span className="tracking-wider text-yellow-400">
        <span>{'★'.repeat(full)}</span>
        <span className="opacity-30">{'★'.repeat(empty)}</span>
        <span className="ml-1 text-xs opacity-70">({rating})</span>
      </span>
    );
  };

  const addToCart = (event: React.MouseEvent<HTMLButtonElement>, productId: number) => {
    event?.stopPropagation();
    event?.preventDefault();
    console.log(`Added product ${productId} to cart.`);
  }

  return (
    <div className="container mx-auto p-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold">Product Dashboard</h1>
        <p className="opacity-70 mt-2 max-w-xl mx-auto">
          Educational demo catalog showing availability, ratings and pricing.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {products.map(product => {

          const primaryImg = product.images[0];

          return (
            <Link
              to={`/products/${product.id}`}
              state={{
                product
              }}
              key={product.id}
              className="
                group relative rounded-2xl p-5 shadow-xl
                bg-gradient-to-b from-[#1e1e1e] to-[#141414]
                transition duration-300 hover:scale-[1.02] hover:shadow-2xl
                cursor-pointer
              "
            >
              {!(product.stock > 0) &&

              <div className="
                absolute top-3 left-3 px-3 py-1 rounded-full text-[10px]
                font-bold backdrop-blur bg-red-600 bg-opacity-30 text-white
              ">
                SOLD OUT
              </div>
              }

              <div className="overflow-hidden rounded-2xl mb-4 relative">
                <img
                  src={primaryImg}
                  alt={product.title}
                  loading='lazy'
                  className="
                    w-full h-44 object-cover rounded-2xl
                    transition duration-300
                  "
                />
                <button className={`
                  absolute top-2 right-2 px-2 py-1 rounded-full text-[12px]
                  font-bold backdrop-blur bg-black bg-opacity-30 text-white
                  opacity-0 group-hover:opacity-100 transition duration-300
                  cursor-pointer
                `}
                onClick={(e) => addToCart(e, product.id)}
                >
                  Add to Cart
                </button>
              </div>

              {/* Category badge */}
              <span className="
                inline-block mb-2 text-[8px] uppercase px-2 py-[2px]
                rounded bg-white bg-opacity-5 text-black
              ">
                {product.category}
              </span>

              {/* Title */}
              <h2 className="text-base font-bold line-clamp-1 mb-1">
                {product.title}
              </h2>

              {/* Brand */}
              <p className="text-xs opacity-50 mb-2">
                by {product.brand}
              </p>

              {/* Description */}
              <p className="text-xs opacity-80 mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* Price block */}
              <div className="flex items-center justify-between mb-3">

                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-black">
                    ${product.price}
                  </span>

                  {product.discountPercentage > 0 && (
                    <span className="text-[11px] opacity-60">
                      -{product.discountPercentage}%
                    </span>
                  )}
                </div>

                <span className="text-[10px] opacity-40">
                  stock: {product.stock}
                </span>
              </div>

              {/* Rating */}
              <div className="text-[12px] mb-2">
                {generateStars(product.rating)}
              </div>

              {/* Stock text */}
              <footer className={`
                text-[12px] font-bold mt-2
                ${product.stock > 0 ? "opacity-90" : "opacity-40"}
              `}>
                {product.stock > 0
                  ? `${product.stock} items remaining`
                  : "Currently out of inventory"}
              </footer>

            </Link>
          )
        })}

      </div>
    </div>
  )
}
