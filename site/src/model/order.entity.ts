
export interface OrderEntity {

  id: number;
  amount: number;
  order_description: Array<{
    item: number;
    quantity: number;
  }>

}