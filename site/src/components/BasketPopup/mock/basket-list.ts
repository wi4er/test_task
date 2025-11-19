import Item1Png from './Group 146.png';
import Item2Png from './Group 147.png';
import { BasketEntity } from '@/model/basket.entity';

export const basketList: Array<BasketEntity> = [
  {
    id: 1,
    name: 'Asgaard sofa',
    price: 'Rs. 250,000.00',
    quantity: 1,
    image: Item1Png.src,
  },
  {
    id: 2,
    name: 'Casaliving Wood',
    price: 'Rs. 270,000.00',
    quantity: 1,
    image: Item2Png.src,
  }
]