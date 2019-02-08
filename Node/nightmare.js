/* eslint-disable no-console */
const Nightmare = require('nightmare');
const n = Nightmare({show: true});

const getSearchResult = n.goto('https://duckduckgo.com')
  .type('#search_form_input_homepage', 'Advanced Node.js')
  .click('#search_button_homepage')
  .wait('#r1-0 a.result__a')
  .evaluate(() => {
    const documentSearch = (num) => {
      const result = [];
      // const query = (value) => document.querySelector('#r1- a.result__a').href;
      for(let i = 1; i < num; i++) {
        const element = `#r1-${i} a.result__a`;
        result.push(document.querySelector(element).href);
      }
      return result;
    };
    return documentSearch(10);
  })
  .end()
  .then(data => data)
  .catch(error => error);

const getName = async() => {
  console.log(await getSearchResult);
  console.timeEnd('search');
};

console.time('search');
getName();

