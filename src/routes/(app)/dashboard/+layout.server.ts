import { LEMONSQUEEZY_API_KEY } from '$env/static/private'
import LemonSqueezy from '@lemonsqueezy/lemonsqueezy.js/dist/index.js'
import type { PageServerLoad } from '../../$types'

export const load: PageServerLoad = async ({ locals }) => {
  const ls = new LemonSqueezy(LEMONSQUEEZY_API_KEY)

  const [products, subscriptions, orders, customers, store] = await Promise.all(
    [
      ls.getProducts(),
      ls.getSubscriptions(),
      ls.getOrders(),
      ls.getCustomers(),
      ls.getStores(),
    ]
  )

  return {
    products: Promise.resolve(products),
    orders: Promise.resolve(orders),
    subscriptions: Promise.resolve(subscriptions),
    customers: Promise.resolve(customers),
    store: Promise.resolve(store),
  }
}
