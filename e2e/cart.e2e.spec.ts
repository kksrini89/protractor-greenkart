import { $, browser, by, element, ElementFinder } from 'protractor';

import { CartPageObject } from './../po/cart.po';

describe('GreenKart:', () => {
  const url: string = 'https://rahulshettyacademy.com/seleniumPractise/#/';
  const veggieFullName: string = 'grape';
  const veggiePartialName: string = 'gra';

  let cartPO: CartPageObject;

  beforeEach(() => {
    cartPO = new CartPageObject();
  });
  afterEach(() => {
    cartPO = null;
  });

  const getProductNames = (productNames: string[] = []) => {
    return [
      ...new Set(
        productNames
          .map((p) => {
            const names = p.split('-');
            return names.length > 0 ? names[0].trim().toLowerCase() : '';
          })
          .filter(Boolean)
      )
    ];
  };

  it('Add to cart: Items Count Check', async () => {
    browser.waitForAngularEnabled(false);
    //   Navigate to 'https://rahulshettyacademy.com/seleniumPractise/#/'
    await cartPO.navigateTo(url);

    await browser.sleep(1000);
    // Query the list items
    const totalProductsCount = await cartPO.products.count();

    // To iterate each item and click on add to cart
    cartPO.products.each((item) => {
      item.element(by.css("div[class='product-action'] button")).click().then();
    });

    await browser.sleep(3000);
    // compare the total items and clicked items count

    console.log('--------------------Output: Test Case 1----------------------');

    const itemsCountEl = await cartPO.itemsCountEl.getText();
    console.log('totalProductsCount', totalProductsCount);

    console.log('itemsCountEl', parseInt(itemsCountEl));
    expect(totalProductsCount).toBe(parseInt(itemsCountEl));
  });

  it('Add to cart: Price Check', async () => {
    await browser.waitForAngularEnabled(false);
    await cartPO.navigateTo(url);

    // await browser.sleep(1000);
    await browser.executeScript('window.scrollTo(0,0)');
    // await browser.executeScript("document.querySelector('.products-wrapper').scrollIntoView({ behavior: 'auto' })");
    //   Query the list items
    // const totalProductsCount = await cartPO.products.count();
    let totalPrice: number = 0;

    (await element.all(by.css('.product-action button'))).forEach(async (el: ElementFinder) => {
      await browser.actions().mouseMove(el).click().perform();
    });

    await browser.sleep(2500);

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
    console.log('--------------------Output: Test Case 2----------------------');
    console.log('totalPrice: ', totalPrice);

    //   compare the total price and sum of clicked item's price
    const addedProductsPrice = await element(by.css("div[class='cart-info'] tr:nth-child(2) td:nth-child(3) strong")).getText();
    console.log('addedProductsPrice', addedProductsPrice);
    expect(parseInt(addedProductsPrice)).toBe(totalPrice);
  });

  it('Search Veggies with Veggie Partial Name: Success', async () => {
    await cartPO.navigateTo(url);
    browser.waitForAngularEnabled(false);

    await browser.executeScript('window.scrollTo(0,0)');

    // const searchVeggie: string = 'gra';

    // Quering all the veggie names
    let productNames: string[] = [];
    element.all(by.css('.product-name')).each(async (product) => {
      productNames.push(await product.getText());
    });
    await browser.sleep(1000);

    productNames = getProductNames(productNames);

    console.log('--------------------Output: Test Case 3----------------------');
    console.log(productNames);

    // Filtering veggies and get veggies count
    const matchVeggiesLength = productNames.filter((product) => product.includes(veggiePartialName))?.length;
    console.log('matchVeggiesLength: ', matchVeggiesLength);

    // Search Veggie
    await cartPO.searchInputEl.sendKeys(veggiePartialName);

    await browser.sleep(1000);
    // Displayed filtered veggies and get veggies count
    const shownProducts = await element(by.css('.products')).all(by.css('.product'));

    console.log('shownProducts', shownProducts.length);

    expect(matchVeggiesLength).toBe(shownProducts.length);
  });

  it('Search Veggies with Veggie Full Name: Success', async () => {
    await cartPO.navigateTo(url);
    browser.waitForAngularEnabled(false);

    await browser.executeScript('window.scrollTo(0,0)');

    // const searchVeggie: string = 'gra';

    // Quering all the veggie names
    let productNames: string[] = [];
    element.all(by.css('.product-name')).each(async (product) => {
      productNames.push(await product.getText());
    });
    await browser.sleep(1000);

    productNames = getProductNames(productNames);

    console.log('--------------------Output: Test Case 4----------------------');
    console.log(productNames);

    // Filtering veggies and get veggies count
    const matchVeggiesLength = productNames.filter((product) => product.includes(veggieFullName))?.length;
    console.log('matchVeggiesLength: ', matchVeggiesLength);

    // Search Veggie
    await cartPO.searchInputEl.sendKeys(veggieFullName);

    await browser.sleep(1000);
    // Displayed filtered veggies and get veggies count
    const shownProducts = await element(by.css('.products')).all(by.css('.product'));

    console.log('shownProducts', shownProducts.length);

    expect(matchVeggiesLength).toBe(shownProducts.length);
  });
});
