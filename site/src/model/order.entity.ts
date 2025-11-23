import { ProductEntity } from '@/model/product.entity';

export interface OrderEntity {

  id: number;
  amount: number;
  created_at: string;
  order_description: Array<{
    id: number;
    item_id: number;
    quantity: number;
    item: ProductEntity;
  }>

}