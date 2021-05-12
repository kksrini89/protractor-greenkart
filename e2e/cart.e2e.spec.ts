import { $, browser, by, element, ElementFinder } from 'protractor';

import { CartPageObject } from './../po/cart.po';

describe('GreenKart - Add to cart:', () => {
  let cartPO: CartPageObject;
  beforeEach(() => {
    cartPO = new CartPageObject();
  });
  afterEach(() => {
    cartPO = null;
  });
  it('Items Count Check', async () => {
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

  it('Price Check', async () => {
    await browser.waitForAngularEnabled(false);
    await cartPO.navigateTo('https://rahulshettyacademy.com/seleniumPractise/#/');

    // await browser.sleep(1000);
    await browser.executeScript("document.querySelector('.products-wrapper').scrollIntoView({ behavior: 'auto' })");
    // document.querySelector('.products-wrapper').scrollIntoView({ behavior: 'auto' });
    //   Query the list items
    // const totalProductsCount = await cartPO.products.count();
    let totalPrice: number = 0;

    (await element.all(by.css('.product-action button'))).forEach(async (el: ElementFinder) => {
      await browser.actions().mouseMove(el).click().perform();
    });

    await browser.sleep(2000);

    (await element.all(by.css('.product-price'))).forEach(async (el: ElementFinder) => {
      const price = await el.getText();
      if (!!price) totalPrice += parseInt(price);
    });

    // element.all(by.css('.product')).each(async (item, index) => {
    //   await browser
    //     .actions()
    //     .mouseMove(item.element(by.css(".product-action button")))
    //     .click()
    //     .perform();
    //   const price = await item.element(by.css("p[class='product-price']")).getText();
    //   totalPrice += parseInt(price);
    // });

    // let zIndex = 0;
    // const items = element.all(by.css('.product'));
    // (async function loop() {
    //   const el: ElementFinder = items.get(zIndex);
    //   await browser
    //     .actions()
    //     .mouseMove(el.element(by.css("div[class='product-action'] button")))
    //     .click()
    //     .perform();
    //   const price = await el.element(by.css("p[class='product-price']")).getText();
    //   totalPrice += parseInt(price);
    //   zIndex += 1;
    //   await loop();
    // })();

    await browser.sleep(3000);
    console.log('totalPrice: ', totalPrice);

    //   compare the total price and sum of clicked item's price
    const addedProductsPrice = await element(by.css("div[class='cart-info'] tr:nth-child(2) td:nth-child(3) strong")).getText();
    console.log('addedProductsPrice', addedProductsPrice);
    expect(parseInt(addedProductsPrice)).toBe(totalPrice);
  });
});
