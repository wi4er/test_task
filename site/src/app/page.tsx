import { ProductList } from '@/components/ProductList';
import { ProductEntity } from '@/model/product.entity';
import { Breadcrumbs } from '@/components/Breadcrumbs';


export default async function Home() {
  const productList: Array<ProductEntity> = await fetch('http://api:3000/items').then(res => res.json()).then(res => {
    return res.data;
  });

  return (
    <div>
      <Breadcrumbs
        list={[{
          name: 'Home',
          link: '/',
        }, {
          name: 'Shop',
          link: '/catalog',
        }]}
      />

      <ProductList list={productList}/>
    </div>
  );
}
