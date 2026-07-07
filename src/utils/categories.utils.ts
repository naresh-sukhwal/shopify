/**
 * ─── Fashion Categories ───────────────────────────────────────────────────────
 *
 * Shared category data used by HomeScreen and SearchScreen.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface FashionCategory {
  id: string;
  titleKey: string;
  title: string;
  query: string;
  sortKey: string;
  image: string;
}

export const FASHION_CATEGORIES: FashionCategory[] = [
  {
    id: '1',
    titleKey: 'category.mens_shirts',
    title: "Men's Shirts",
    query: 'product_type:Shirts',
    sortKey: 'BEST_SELLING',
    image:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '2',
    titleKey: 'category.tshirts',
    title: 'T-Shirts',
    query: 'product_type:T-Shirts',
    sortKey: 'BEST_SELLING',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '3',
    titleKey: 'category.polo_shirts',
    title: 'Polo Shirts',
    query: 'product_type:Polo',
    sortKey: 'BEST_SELLING',
    image:
      'https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '4',
    titleKey: 'category.jeans',
    title: 'Jeans',
    query: 'product_type:Jeans',
    sortKey: 'BEST_SELLING',
    image:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '5',
    titleKey: 'category.trousers',
    title: 'Trousers',
    query: 'product_type:Trousers',
    sortKey: 'BEST_SELLING',
    image:
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=600&auto=format&fit=crop',
  },
];
