import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    produtosNoCarrinho: null,
  };

  componentDidMount() {
    const produtosSalvos = JSON.parse(localStorage.getItem('produtosSalvos'));
    this.setState({
      produtosNoCarrinho: produtosSalvos,
    });
  }

  increaseQuantity = (titleProduct) => {
    const { produtosNoCarrinho } = this.state;
    // const { firstChild } = target.parentNode;
    // const titleProduct = (
    //   firstChild.innerText);
    const filter = produtosNoCarrinho.filter(({ title }) => title === titleProduct);
    filter[0].quantidade += 1;
    this.setState({ produtosNoCarrinho });
    localStorage.setItem('produtosSalvos', JSON.stringify(produtosNoCarrinho));
  };

  decreaseQuantity = (titleProduct) => {
    const { produtosNoCarrinho } = this.state;
    // const { firstChild } = target.parentNode;
    // const titleProduct = (
    //   firstChild.innerText);
    const filter = produtosNoCarrinho.filter(({ title }) => title === titleProduct);
    if (filter[0].quantidade > 1) {
      filter[0].quantidade -= 1;
      this.setState({ produtosNoCarrinho });
      localStorage.setItem('produtosSalvos', JSON.stringify(produtosNoCarrinho));
    }
  };

  removeFromCart = (titleProduct) => {
    const { produtosNoCarrinho } = this.state;
    // const { firstChild } = target.parentNode;
    // const titleProduct = (
    //   firstChild.innerText);
    const filter = produtosNoCarrinho.filter(({ title }) => title !== titleProduct);
    this.setState({ produtosNoCarrinho: filter });
    localStorage.setItem('produtosSalvos', JSON.stringify(filter));
  };

  render() {
    const { produtosNoCarrinho } = this.state;
    return (
      <div>
        {
          produtosNoCarrinho && produtosNoCarrinho.length ? (
            produtosNoCarrinho.map(({ title, price, image, quantidade }) => (
              <div key={ title }>
                <p data-testid="shopping-cart-product-name">{ title }</p>
                <p>{ price }</p>
                <img src={ image } alt={ title } />
                <p data-testid="shopping-cart-product-quantity">{ quantidade }</p>
                <button
                  onClick={ () => this.increaseQuantity(title) }
                  data-testid="product-increase-quantity"
                  type="button"
                >
                  +
                </button>
                <button
                  onClick={ () => this.decreaseQuantity(title) }
                  data-testid="product-decrease-quantity"
                  type="button"
                >
                  -
                </button>
                <button
                  onClick={ () => this.removeFromCart(title) }
                  data-testid="remove-product"
                  type="button"
                >
                  X
                </button>
              </div>
            ))
          ) : (
            <div>
              <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            </div>
          )
        }
      </div>
    );
  }
}
