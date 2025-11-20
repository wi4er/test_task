import { OrderList } from '@/components/OrderList';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function OrdersPage() {
  return (
    <div>
      <Breadcrumbs list={[
        {name: 'Home', link: '/'},
        {name: 'Orders', link: '/orders'},
      ]}/>
      <OrderList
      />
    </div>
  );
}