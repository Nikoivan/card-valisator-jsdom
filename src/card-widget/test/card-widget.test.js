import CardWidget from "../card-widget";
import CardCollection from "../compopents/CardCollection";

test("check card widget by correct card number", () => {
  document.body.innerHTML = `<div class="wrapper"></div>`;

  const wrapper = document.querySelector(".wrapper");
  const cardWidget = new CardWidget(wrapper, CardCollection);

  cardWidget.bindToDOM();

  const form = wrapper.querySelector(".form");
  const input = form.querySelector(".input");
  const btn = form.querySelector(".btn");

  input.value = "371449635398431";
  btn.click();

  let cardItems = [...wrapper.querySelector(".card-list").children];
  cardItems = cardItems.filter((el) => el.classList.contains("deactive"));

  expect(cardItems.length).toBe(6);
});
