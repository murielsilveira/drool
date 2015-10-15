var drool = require('../');
var assert = require('assert');


var tests = [
  {
    url: 'http://todomvc.com/examples/emberjs/index.html',
    todo: '#new-todo',
    li: '#todo-list li',
    destroy: '.destroy'
  },
  {
    url: 'http://todomvc.com/examples/backbone/index.html',
    todo: '.new-todo',
    li: '.todo-list li',
    destroy: '.destroy'
  },
  {
    url: 'http://todomvc.com/examples/backbone_marionette/index.html',
    todo: '#new-todo',
    li: '#todo-list li',
    destroy: '.destroy'
  },
  {
    url: 'http://todomvc.com/examples/ampersand/index.html',
    todo: '#new-todo',
    li: '#todo-list li',
    destroy: '.destroy'
  },
  {
    url: 'http://todomvc.com/examples/polymer/index.html',
    todo: '#new-todo',
    li: '#todo-list li',
    destroy: '.destroy'
  },
  {
    url: 'http://todomvc.com/examples/vanillajs/index.html',
    todo: '.new-todo',
    li: '.todo-list li',
    destroy: '.destroy'
  },
  {
    url: 'http://todomvc.com/examples/react/index.html',
    todo: '.new-todo',
    li: '.todo-list li',
    destroy: '.destroy'
  },
];

tests.forEach(function(test) {
  var driver = drool.start({
    chromeOptions: 'no-sandbox'
  });

  drool.flow({
    repeatCount: 50,
    setup: function() {
      driver.get(test.url);
    },
    action: function() {

      // You gots to wait a bunch because sometimes Polymer ain't ready.
      driver.wait(function () {
        return driver.isElementPresent(drool.webdriver.By.css(test.todo));
      }, 10000);

      driver.findElement(drool.webdriver.By.css(test.todo)).sendKeys('find magical goats', drool.webdriver.Key.ENTER);

      driver.wait(function () {
        return driver.isElementPresent(drool.webdriver.By.css(test.li));
      }, 1000);

      driver.findElement(drool.webdriver.By.css(test.li)).click();

      driver.wait(function () {
        return driver.isElementPresent(drool.webdriver.By.css(test.destroy));
      }, 1000);

      driver.findElement(drool.webdriver.By.css(test.destroy)).click();
    },
    assert: function(after, initial) {
      console.log(test.url, after,  '--', (after.gc.MinorGC.duration +
            after.gc.MajorGC.duration +
            after.gc['V8.GCScavenger'].duration +
            after.gc['V8.GCIncrementalMarking'].duration) + ' μs');
    }
  }, driver)

  driver.quit();
});


