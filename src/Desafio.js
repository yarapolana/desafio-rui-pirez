import { useEffect, useState } from 'react'
import './Desafio.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilteredProducts] = useState([]);

  function searchItem(e) {
    e.preventDefault()
    const items = products.filter(product => {
      return product.title.toUpperCase().includes(e.target.value.toUpperCase())
    })

    if(e.target.value.length < 1) {
      setFilteredProducts([])
    } else {
      setFilteredProducts(items)
    }
  };

  useEffect(() => {
    fetch('http://localhost:3333/items').then(
      res => res.json()
    ).then(res => setProducts(res))
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1><i className="fas fa-flag-usa"></i> DESAFIO</h1>
        <div className="search-box">
          <input className="input-icons" type="text" onChange={searchItem} placeholder="Type to Search" />
          <div className="icon"><i id="id-icon" className="fas fa-search"></i></div>
        </div>
        
        <div>
          <h3>{filterProducts.length} Products</h3>
          {filterProducts && filterProducts.length > 0 ? filterProducts.map(product => {
            console.log(product.image)
            return (
            <div key={product.title} className="Product">
              <img src={product.image} alt="" />
              <div>
                <h3>{product.title}</h3>
                <small>{product.path}</small>
              </div>
            </div>
          )}) : null}
        </div>
      </header>
    </div>
  );
};

export default App;
