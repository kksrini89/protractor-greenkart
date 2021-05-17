Feature: GreenKart

Scenario: Add to cart: Items Count Check

Given Navigate to "https://rahulshettyacademy.com/seleniumPractise/#/" site
When add veggies to the cart
Then The added veggie count should be equal to available veggie count