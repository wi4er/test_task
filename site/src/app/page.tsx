import { ProductList } from '@/components/ProductList';
import { ProductEntity } from '@/model/product.entity';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Advantages } from '@/components/Advantages';

const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://api:3000';

export default async function Home() {
  const productList: Array<ProductEntity> = await fetch(
    `${host}/items`,
    {cache: 'no-store'},
  ).then(res => res.json()).then(res => {
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
          link: '/',
        }]}
      />

      <ProductList list={productList}/>

      <Advantages/>
    </div>
  );
}
