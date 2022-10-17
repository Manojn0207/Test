import data from "./data";

function App(){
  return(
    <div>
      <header>
        <a href = "/">hmy</a>
      </header>
      <main>
        <h1>Featured products</h1>
        {
          data.products.map(products => (<div>
            <img src = {products.image} alt = {product.image}/>
            <p>
              {product.name}
            </p>
            <p>
              {product.price}
            </p>
          </div>))
        }
      </main>
    </div>
  )
}
export default App;