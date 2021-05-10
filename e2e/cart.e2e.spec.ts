import { browser, by, element } from 'protractor';

import { CartPageObject } from './../po/cart.po';

describe('GreenKart - Add to cart', () => {
  let cartPO: CartPageObject;
  beforeEach(() => {
    cartPO = new CartPageObject();
  });
  afterEach(() => {
    cartPO = null;
  });
  it('Items Count Check: add item to cart', async () => {
    browser.waitForAngularEnabled(false);
    //   Navigate to 'https://rahulshettyacademy.com/seleniumPractise/#/'
    await cartPO.navigateTo('https://rahulshettyacademy.com/seleniumPractise/#/');

    await browser.sleep(1000);
    //   Query the list items
    const products = element(by.className('products')).all(by.css('.product'));
    const totalProductsCount = await cartPO.products.count();

    // //   Iterate each item and click on add to cart
    // let productsPromises: any[] = [];
    cartPO.products.each((item, index) => {
      item.element(by.css("div[class='product-action'] button")).click().then();
    });
    // await Promise.all(productsPromises);

    await browser.sleep(3000);
    // //   compare the total items and clicked items count
    const itemsCountEl = await cartPO.itemsCountEl.getText();
    console.log('totalProductsCount', totalProductsCount);

    console.log('itemsCountEl', parseInt(itemsCountEl));
    expect(totalProductsCount).toBe(parseInt(itemsCountEl));
  });

  it('Price Check: add item to cart', async () => {
    browser.waitForAngularEnabled(false);
    await cartPO.navigateTo('https://rahulshettyacademy.com/seleniumPractise/#/');

    await browser.sleep(1000);
    //   Query the list items
    // const totalProductsCount = await cartPO.products.count();
    let totalPrice: number = 0;

    element(by.className('products'))
      .all(by.css('.product'))
      .each(async (item, index) => {
        await browser.sleep(2000);
        item
          .element(by.css("div[class='product-action'] button"))
          .click()
          .then(async () => {
            item
              .element(by.css("p[class='product-price']"))
              .getText()
              .then((val) => {
                totalPrice += parseInt(val);
              });
          });
      });
    await browser.sleep(3000);
    console.log('totalPrice: ', totalPrice);

    //   compare the total price and sum of clicked item's price
    const addedProductsPrice = await element(by.css("div[class='cart-info'] tr:nth-child(2) td:nth-child(3) strong")).getText();
    console.log('addedProductsPrice', addedProductsPrice);
    expect(parseInt(addedProductsPrice)).toBe(totalPrice);
  });
});
