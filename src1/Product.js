import React from 'react';
import * as ProductAction from './actions'
import ps from './store' 

class Product extends React.Component {
  constructor(){
    super();
    this.state = {
      products: ps.getAllProducts(),
      proName: '',
      proPrice: '',
      dProName: ''
    }
    ps.on("change", this.getAllProduct);
  }

  getAllProduct = () => {
    console.log(ps.getAllProducts());
    this.setState({
      products: ps.getAllProducts()
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      proName: this.refs.proName.value,
      proPrice: this.refs.proPrice.value
    })
    let product = {
      proName: this.refs.proName.value,
      proPrice: this.refs.proPrice.value
    }
    ProductAction.addProduct(product);
  }

  hndleDeleteSubmit = (event) => {
    event.preventDefault();
    this.setState({
      dProName: this.refs.dProName.value
    })
    ProductAction.deleteProduct(this.refs.dProName.value);
  }

  renderList = (products) => products.map((product, index) => <tr key={index}>
                                                        <td>{product.proName}</td>
                                                        <td>{product.proPrice}</td>
                                                      </tr>)

  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="proName">Product Name</label>
                <input type="text" ref="proName" className="form-control"/>
              </div>
              <div className="form-group">
                <label htmlFor="proPrice">Price</label>
                <input type="text" ref="proPrice" className="form-control"></input>
              </div>
              <button className="btn btn-success" type="submit">Submit</button>
            </form>
            <h1>Delete product</h1>
            <form onSubmit={this.hndleDeleteSubmit}>
              <div className="form-group">
                <input type="text" ref="dProName" className="form-control"/>
              </div>
              <button className="btn btn-success" type="submit">Submit</button>
            </form>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Product Price</th>
                </tr>
              </thead>
              <tbody>
                {this.renderList(this.state.products)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Product;