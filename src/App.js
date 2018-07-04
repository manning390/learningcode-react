import React, { Component } from 'react';
import './App.css';

import AddProduct from './AddProduct.js';
import ProductItem from './ProductItem.js';

const products = [
  {
    name: 'iPad',
    price: 200,
  },
  {
    name: 'iPhone',
    price: 650
  }
];

localStorage.setItem('products', JSON.stringify(products));

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: JSON.parse(localStorage.getItem('products'))
    };

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
    const products = this.getProducts();
    this.setState({ products });
  }

  getProducts() {
    return this.state.products;
  }

  onAdd(name, price) {
    const products = this.getProducts();

    products.push({
      name,
      price
    });

    this.setState({ products });
  }

  onDelete(name) {
    const products = this.getProducts();

    const filteredProducts = products.filter(product => {
      return product.name !== name;
    });

    this.setState({
      products: filteredProducts
    });
  }

  onEdit(originalName, name, price) {
    let products = this.getProducts();

    products = products.map(product => {
      if (product.name === originalName) {
        product.name = name;
        product.price = price;
      }

      return product;
    });

    this.setState({ products })
  }

  render() {
    return (
      <div className="App">
        <h1>Products Manager</h1>

        <AddProduct
          onAdd={this.onAdd}
        />

        {
          this.state.products.map(product => {
            return (
              <ProductItem
                key={product.name}
                {...product}
                onDelete={this.onDelete}
                onEditSubmit={this.onEdit}
              />
            )
          })
        }
      </div>
    );
  }
}
