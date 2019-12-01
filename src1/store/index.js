import Dispatcher from '../Dispatcher';
import {EventEmitter} from 'events';

class ProductStore extends EventEmitter{
  constructor(){
    super();
    this.products = [];
  }

  addProduct(product){
    this.products.push(product);
    this.emit("change");
  }

  deleteProduct(proName){
    let id = -1;
    this.products.forEach((product, index) => {
      if(product.proName == proName){
        id = index;
      }
    })
    if(id!=-1)
    this.products.splice(id, 1)
    this.emit("change")
  }

  handleActions(action){
    switch(action.type) {
      case 'ADD_PRODUCT':
        this.addProduct(action.product)
        break;
      case 'DELETE_PRODUCT':
        this.deleteProduct(action.proName)
        break;
      default:
        console.log('Wrong choice');
    }
  }

  getAllProducts(){
    return this.products
  }
}

let ps = new ProductStore();
Dispatcher.register(ps.handleActions.bind(ps));
export default ps;