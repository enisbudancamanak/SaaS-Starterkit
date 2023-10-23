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
  const fetchAllOrders = async () => {
    return await getAllOrders()
  }

  let orders = await fetchAllOrders()

  const fetchCustomers = async () => {
    return await ls.getCustomers()
  }

  const fetchStore = async () => {
    const stores = await ls.getStores()
    return stores.data[0]
  }

  const fetchSortedOrders = async () => {
    return sortMonths(getOrdersSortedByMonth(orders))
  }

  const fetchTotalRevenue = async () => {
    const store = await fetchStore()
    return store.attributes.total_revenue + 1
  }

  const fetchOrdersTotal = async () => {
    return orders.length
  }

  const getAll = async () => {
    return {
      orders: orders,
      store: await fetchStore(),
      totalRevenue: await fetchTotalRevenue(),
      ordersTotal: await fetchOrdersTotal(),
      sortedOrders: await fetchSortedOrders(),
    }
  }

  return {
    orders: await getAllOrders(),
    customers: await fetchCustomers(),
    streamed: {
      getAll: getAll(),
    },
  }
}

async function getAllOrders() {
  let hasNextPage = true
  let perPage = 10
  let page = 1
  let data: any = []
  while (hasNextPage) {
    const resp = await ls.getOrders({ perPage, page })

    data = data.concat(resp['data'])

    if (resp.meta.page.lastPage > page) {
      page += 1
    } else {
      hasNextPage = false
    }
  }

  return data
}

function getOrdersSortedByMonth(orders: any) {
  // SORT SALE BY MONTH = GET LAST 12 MONTHS
  return months.map((month, i) => {
    return {
      name: month,
      month: i + 1,
      total: orders.reduce((acc: number, order: any) => {
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
      orders: orders.filter((order: any) => {
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
