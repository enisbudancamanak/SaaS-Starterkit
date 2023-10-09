import { LEMONSQUEEZY_API_KEY } from '$env/static/private'
import LemonSqueezy from '@lemonsqueezy/lemonsqueezy.js/dist/index.js'
import type { PageServerLoad } from '../../$types'

export const load: PageServerLoad = async ({ locals }) => {
  const ls = new LemonSqueezy(LEMONSQUEEZY_API_KEY)

  const products = await ls.getProducts()
  const subscriptions = await ls.getSubscriptions()
  const orders = await ls.getOrders()

  return {
    products: products,
    orders: orders,
    subscriptions: subscriptions,
  }
}
