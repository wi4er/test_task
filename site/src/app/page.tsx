import { ProductList } from '@/components/ProductList';
import { ProductEntity } from '@/model/product.entity';


export default async function Home() {
  const productList: Array<ProductEntity> = await fetch('http://api:3000/items').then(res => res.json()).then(res => {
    return res.data;
  });

  return (
    <div>
      <ProductList list={productList}/>
    </div>
  );
}
