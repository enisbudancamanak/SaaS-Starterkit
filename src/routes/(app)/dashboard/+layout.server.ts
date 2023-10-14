import { LEMONSQUEEZY_API_KEY } from '$env/static/private'
import LemonSqueezy from '@lemonsqueezy/lemonsqueezy.js/dist/index.js'
import type { PageServerLoad } from '../../$types'
import dayjs from 'dayjs'

const ls = new LemonSqueezy(LEMONSQUEEZY_API_KEY)
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const load: PageServerLoad = async ({ locals }) => {
  const [products, subscriptions, orders, customers, store] = await Promise.all(
    [
      ls.getProducts(),
      ls.getSubscriptions(),
      getAllOrders(await ls.getOrders({ page: 1, perPage: 10 })),
      ls.getCustomers(),
      ls.getStores(),
    ]
  )
  const sortedOrders = sortMonths(getOrdersSortedByMonth(orders))

  return {
    products: Promise.resolve(products),
    orders: Promise.resolve(orders),
    sortedOrders: Promise.resolve(sortedOrders),
    subscriptions: Promise.resolve(subscriptions),
    customers: Promise.resolve(customers),
    store: Promise.resolve(store),
  }
}

async function getAllOrders(orders: any) {
  let page = 2
  while (page <= orders.meta.page.lastPage) {
    await ls.getOrders({ page: page, perPage: 10 }).then((res) => {
      orders.data = [...orders.data, ...res.data]
    })

    page = page + 1
  }

  return orders
}

function getOrdersSortedByMonth(orders: any) {
  // SORT SALE BY MONTH = GET LAST 12 MONTHS
  return months.map((month, i) => {
    return {
      name: month,
      month: i + 1,
      total: orders.data.reduce((acc: number, order: any) => {
        const orderMonth = dayjs(order.attributes.created_at).month()
        const orderYear = dayjs(order.attributes.created_at).year()

        if (
          orderMonth === i &&
          (orderYear == dayjs().year() || orderYear == dayjs().year() - 1)
        ) {
          return (
            acc + parseInt(order.attributes.total_formatted.replace('€', ''))
          )
        }
        return acc
      }, 0),
      orders: orders.data.filter((order: any) => {
        const orderMonth = dayjs(order.attributes.created_at).month()

        return orderMonth === i
      }),
    }
  })
}
function sortMonths(orders: any) {
  const currentMonth = dayjs().month() + 1
  orders = orders.sort(function (m1: any, m2: any) {
    var n1 = m1.month,
      n2 = m2.month
    if (n1 > currentMonth) {
      n1 = n1 - 12
    }
    if (n2 > currentMonth) {
      n2 = n2 - 12
    }
    return n1 - n2
  })

  return orders
}
