import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class CartPageObject {
  products: ElementArrayFinder;
  addToCartButton: ElementFinder;
  itemsCountEl: ElementFinder;

  constructor() {
    this.products = element(by.className('products')).all(by.css('.product'));
    this.addToCartButton = element(by.css("div[class='product-action'] button"));
    this.itemsCountEl = element(by.css("div[class='cart-info'] tr:first-child td:nth-child(3) strong"));
  }

  async navigateTo(url: string) {
    await browser.get('https://rahulshettyacademy.com/seleniumPractise/#/');
  }
}
