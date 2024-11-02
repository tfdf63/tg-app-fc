import './Shop.css'
import products from '../../assets/product.js'
import ProductCard from '../ProductCard/ProductCard.jsx'

function ProductList() {
	// const [productList, setProductList] = useState([])

	// useEffect(() => {
	// 	// Имитация загрузки данных
	// 	setProductList(products)
	// }, [])

	return (
		<div className='product-list'>
			{products.map(product => (
				<ProductCard
					key={product.id}
					name={product.name}
					price={product.price}
					imageUrl={product.imageUrl}
				/>
			))}
		</div>
	)
}

export default ProductList
