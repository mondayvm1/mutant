export type ProductCategory = 'vehicle' | 'accessory' | 'part' | 'merch' | 'bundle'

export type StockStatus = 'in_stock' | 'preorder' | 'out_of_stock'

export type FulfillmentMode = 'warehouse' | 'dropship' | 'hybrid' | 'manual'

export type SupplierSource = {
  platform: 'amazon' | 'ebay' | 'aliexpress' | 'manual' | 'warehouse'
  supplierUrl: string
  supplierSku?: string
  supplierPrice?: number
  notes?: string
  isPrimary?: boolean
}

export type Product = {
  id: string
  slug: string
  name: string
  category: ProductCategory
  subcategory?: string
  shortDescription: string
  description: string
  price: number
  compareAtPrice?: number
  images: string[]
  featuredImage: string
  sku: string
  stockStatus: StockStatus
  badge?: string
  tags: string[]
  specs?: Record<string, string>
  compatibleWith?: string[]
  relatedProducts?: string[]
  // Internal-only supplier data (never shown to customers)
  supplierSource?: SupplierSource[]
  internalCost?: number
  marginTarget?: number
  fulfillmentMode?: FulfillmentMode
  visibleToCustomer: boolean
}

export type TrimId = 'base' | 'meta' | 'pro'

export type MutantTrim = {
  id: TrimId
  name: string
  tagline: string
  price: number
  depositAmount: number
  topSpeed: string
  range: string
  power: string
  suspension: string
  brakes: string
  tires: string
  weight: string
  includes: string[]
  badge?: string
  accentColor: string
}

export type CartItem = {
  productId: string
  quantity: number
  selectedTrim?: TrimId
  selectedColor?: string
  addons?: string[]
}
