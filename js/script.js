/*global jQuery, Handlebars, Router */
//jQuery(function ($) {
//    'use strict';

/* Handlebars.registerHelper('eq', function (a, b, options) {
     return a === b ? options.fn(this) : options.inverse(this);
 });
*/
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;
var categories;

var util = {
    uuid: function () {
        /*jshint bitwise:false */
        var i, random;
        var uuid = '';

        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
        }

        return uuid;
    },
    pluralize: function (count, word) {
        return count === 1 ? word : word + 's';
    },
    store: function (namespace, data) {
        if (arguments.length > 1) {
            return localStorage.setItem(namespace, JSON.stringify(data));
        } else {
            var store = localStorage.getItem(namespace);
            return (store && JSON.parse(store)) || [];
        }
    }
};

var App = {
    categories,
    init: function () {
        //if empty, then get the value of the categories if they don't exist
        if (util.store('categories').length === 0) {
            let url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
            var amigo;
            fetch(url)
                .then(
                    function (response) {
                        if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }
                        // Examine the text in the response
                        response.json()
                            .then(function (data) {
                                //jsonData = data;
                                util.store('categories', data);

                                amigo = util.store('categories');
                                App.categories = amigo;
                            });
                    })
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });
            //fetch all of the categories
        } else {
            this.categories = util.store('categories');
        };
        //console.log(this.categories);
        setTimeout(function () { console.log(this.categories) }, 2000);
        this.recipes = util.store('good-recipes');

        //          this.recipesTemplate = Handlebars.compile($('#recipes-template').html());
        //        this.footerTemplate = Handlebars.compile($('#footer-template').html());
        //      this.bindEvents();

        //if needed
        /*          new Router({
                      '/:filter': function (filter) {
                          this.filter = filter;
                          this.render();
                      }.bind(this)
                  }).init('/all');*/
    },

    bindEvents: function () {
 //       $('.new-recipe').on('keyup', this.create.bind(this));
/*		$('.toggle-all').on('change', this.toggleAll.bind(this));
        $('.footer').on('click', '.clear-completed', this.destroyCompleted.bind(this));
        $('.todo-list')
            .on('change', '.toggle', this.toggle.bind(this))
            .on('dblclick', 'label', this.editingMode.bind(this))
            .on('keyup', '.edit', this.editKeyup.bind(this))
            .on('focusout', '.edit', this.update.bind(this))
            .on('click', '.destroy', this.destroy.bind(this));
    */  },

    create: function () {
        //get the value of the input
        var $input = 'ola'//$(e.target);
        var val = 'ola'//$input.val().trim();
        /* if (e.which !== ENTER_KEY || !val) {
             return;
         }
*/

        var jsonResult = this.fetchAPI(val);
        this.recipes.push(

        );

        $input.val('');

        this.render();
        // fetch the api and get the returning values
        // return the json
    },
    test: function () {
        var url = 'https://www.themealdb.com/api/json/v1/1/random.php'
        console.time('ola');
        fetch(url)
            .then(
                function (response) {
                    console.log(response.status);
                    if (response.status !== 200) {
                        console.warn('Looks like there was a problem. Status Code: ' +
                            response.status);
                        console.timeEnd('ola');
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        console.log(data);
                        console.timeEnd('ola');
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
                console.timeEnd('ola');
            });
    }
}


App.init();
//});
