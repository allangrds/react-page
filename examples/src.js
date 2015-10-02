var React = require('react');
var irl = require('../index');

var createClass = React.createClass;
var createElement = React.createElement;
var DOM = React.DOM;
var h1 = DOM.h1;
var h2 = DOM.h2;
var hr = DOM.hr;
var div = DOM.div;
var aside = DOM.aside;
var em = DOM.em;
var ul = DOM.ul;
var li = DOM.li;
var a = DOM.a;
var button = DOM.button;
var PropTypes = React.PropTypes;

var pages = [
  {text: 'Sim', href: '/'},
  {text: 'Não', href: '/nao'},
  {text: 'Talvez', href: '/talvez'}
].map(function (p, index) {
    return li({key: index},
      a({href: p.href}, p.text));
  });

var cType = {
  childComponent: PropTypes.func.isRequired
};

var Raiz = createClass({

  displayName: 'Raiz',
  contextTypes: cType,

  getInitialState: function () {
    return {
      count: 1
    };
  },

  inc: function () {

    this.setState({
      count: this.state.count + 1
    });

  },

  render: function () {

    return div({className: 'container'},

      div({className: 'row'},

        aside({className: 'col-sm-4'},
          ul({className: 'nav nav-pills nav-stacked'}, pages)
        ),

        div({className: 'col-sm-8'},
          h1(null, 'Topo da árvore ' + this.state.count),
          hr(),
          button({className: 'btn btn-primary', onClick: this.inc}, '+'),
          createElement(this.context.childComponent)
        )
      )
    );

  }

});

var Sim = createClass({

  displayName: 'Sim',
  render: function () {

    return div(null, h2(null, 'Sim, e acabou'));

  }

});

var Nao = createClass({

  displayName: 'Não',
  contextTypes: cType,

  render: function () {

    return div(null, h2(null, 'Não'),
      createElement(this.context.childComponent));

  }

});

var Talvez = createClass({

  displayName: 'Talvez',
  contextTypes: cType,

  render: function () {

    return div(
      null,
      h2(null, 'Talvez'),
      createElement(this.context.childComponent)
    );

  }

});


var ConteMais = createClass({

  displayName: 'ConteMais',
  contextTypes: {
    route: PropTypes.object.isRequired
  },

  render: function () {

    return a({
      className: 'btn btn-default',
      href: this.context.route.pathname + '/the-end'
    }, 'e daí');

  }

});

var Edai = createClass({

  displayName: 'Edai',
  render: function () {

    return div({className: 'well'}, 'Ninguém liga');

  }

});

var Loading = createClass({
  displayName: 'Loading',
  render: function () {
    return em(null, 'Loading...');
  }
});

function render(Root) {
  React.render(createElement(Root), document.getElementById('app'));
}


function inAMin() {

  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(true);
    }, 3000);
  });

}

irl('/',

  irl
    .resolve(inAMin)
    .then(Loading)
    .then(Raiz),

  Sim,

  render
);


Edai = irl.resolve(inAMin)
  .then(Loading)
  .then(Edai);

irl('/nao', Raiz, Nao, ConteMais, render);
irl('/talvez', Raiz, Talvez, ConteMais, render);
irl('/nao/the-end', Raiz, Nao, Edai, render);
irl('/talvez/the-end', Raiz, Talvez, Edai, render);
irl();
