import { Given, Then, When } from '@cucumber/cucumber';
import { browser, by } from 'protractor';
import * as chai from 'chai';

import { CartPageObject } from './../po/cart.po';
const expect = chai.expect;

const CartPO = new CartPageObject();

const url: string = 'https://rahulshettyacademy.com/seleniumPractise/#/';
const veggieFullName: string = 'grape';
const veggiePartialName: string = 'gra';
const randomName: string = 'xyz';

let totalProductsCount: Number;

Given('Navigate to {string} site', async function (arg: string) {
  await CartPO.navigateTo(arg);
});

When('add veggies to the cart', async function () {
  // Query the list items
  totalProductsCount = await CartPO.products.count();

  // To iterate each item and click on add to cart
  CartPO.products.each((item) => {
    item.element(by.css("div[class='product-action'] button")).click().then();
  });

  await browser.sleep(3000);
});

Then('The added veggie count should be equal to available veggie count', async function () {
  // compare the total items and clicked items count

  console.log('--------------------Output: Test Case 1----------------------');

  const itemsCountEl = await CartPO.itemsCountEl.getText();
  console.log('totalProductsCount', totalProductsCount);

  console.log('itemsCountEl', parseInt(itemsCountEl));
  expect(totalProductsCount).to.equal(parseInt(itemsCountEl));
});
