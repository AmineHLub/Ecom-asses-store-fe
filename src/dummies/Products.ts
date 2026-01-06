import type { Product } from "../types/Product.type";

function createEducationalProducts(): Product[] {
  const list: Product[] = [];

  const brands = ["EduTech","SchoolPro","LearnX","StudentHub","DevMaster"];
  const categories = ["electronics","home","fashion","sports","books"];

  for (let i = 1; i <= 250; i++) {
    const isZero = i % 11 === 0 || i % 17 === 0;

    const stock = isZero ? 0 : Math.floor(Math.random() * 120) + 1;
    const cat = categories[i % categories.length];
    const brand = brands[i % brands.length];

    const price = Math.floor(Math.random() * 900) + 10;
    const discountPercentage = Math.floor(Math.random() * 30);
    const rating = Number((Math.random() * 5).toFixed(1));

    const img1 = `https://picsum.photos/id/${i + 30}/400/300`;
    const img2 = `https://picsum.photos/id/${i + 60}/400/300`;

    list.push({
      id: i,
      title: `${brand} product #${i}`,
      description: `Educational demo item number ${i} in category ${cat}`,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category: cat,
      images: i % 5 === 0 ? [img1] : [img1, img2]
    });
  }

  return list;
}

const data = createEducationalProducts();

const fakeProductsPromise: Promise<Product[]> =
  new Promise(resolve => {
    setTimeout(() => resolve(data), 5000);
  });

function fakeFetchProductById(id: number): Promise<Product | undefined> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data.find(p => p.id === id));
    }, 2000);
  });
}

const productCache = new Map<number, Promise<Product | undefined>>();
export function thenableProduct(id: number): Promise<Product | undefined> {
  if (!productCache.has(id)) {
    productCache.set(id, fakeFetchProductById(id));
  }
  return productCache.get(id)!;
}

export { fakeProductsPromise, fakeFetchProductById, data as products };