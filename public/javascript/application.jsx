(function() {

  /** @jsx React.DOM */

  var visualizations = [{name: 'Andrew', id: 5}, {name: 'Raf', id: 6}];
  
  // var WebGLVisualization = require('./webgl-viz.jsx');
  
  var AppView = React.createClass({
    getInitialState: function () {
      return {
        page: 'List'
      }
    },
    changePage: function(page){
      this.setState({page: page});
    },
    render: function(){
      if (this.state.page === 'List'){
        return <ListView parent={this}/>;
      } else {
        return <EditView parent ={this}/>;
      }
    }
  });

  var ListView = React.createClass({
    render: function(){
      var self = this;
      var items = visualizations.map(function(v){
        return <li onClick={function(){
          self.props.parent.changePage('Edit');
        }}>{v.name}</li>
      })
      return (
        <div>
          <h1>List View</h1>
          <div>
            {items}
          </div>
        </div>
        )
      } 
  });

  var EditView = React.createClass({
    render: function(){
      var self = this;
      return (
        <div>
          <h1>Edit View</h1>
          <p onClick={function(){
            self.props.parent.changePage('List');
          }}>Back to List</p>
          <WebGLVisualizer />
          <AudioWave />
        </div>
        )
      } 
  });

  var WebGLVisualizer = React.createClass({
    render: function() {
      return (
        <div>
          <div className='viz-container'>
            <ParameterMenu />
          </div>
        </div>
      );
    },
    componentDidMount: function() {
      var soundAnalyzer = initSound();
      var container = $('.viz-container');
      var viz = new VIZ.Simple(container, soundAnalyzer);
      Menu();
    }
  });

  var ParameterMenu = React.createClass({
    render: function(){
      return (
        <div>
          <div className="close">- hide options</div>
          <div className="menu-button">+ show options</div>
          <div className="menu">
            <fieldset>
              <legend>Color</legend>
              <ul className="color">
                <li>
                  <form htmlFor='input-red'>Red</form>
                  <input id='input-red' type='number' name="red"/>
                </li>
                <li>
                  <form htmlFor='input-green'>Green</form>
                  <input id='input-green' type='number' name="green"/>
                </li>
                <li>
                  <form htmlFor='input-blue'>Blue</form>
                  <input id='input-blue' type='number' name="blue"/>
                </li>
              </ul>
            </fieldset>
            <fieldset>
              <legend>Shape</legend>
              <ul className='shape'>
                <li>
                  <label>Sphere</label>
                  <input type="radio" name="shape" value="sphere"/>
                </li>
                <li>
                  <label>Cube</label>
                  <input type="radio" name="shape" value="cube"/>
                </li>
              </ul>
            </fieldset>
            <p>Source</p>
            <ul>
                <li className="track">Track</li>
            </ul>
          </div>
        </div> 
      )
    }
  })

  var AudioWave = React.createClass({
    render: function(){
      return (
        <div className="wave-container">

          <div className="controls">
            <button data-action="backward">Backwards</button>
            <button data-action="play">Play/Pause</button>
            <button data-action="forward">Forwards</button>
            <button data-action="toggle-mute">Mute</button>
          </div>
          <div id="wave"></div>
          <div id="wave-timeline"></div>

          <p id="drop">Drop your file here</p>
        </div>
      );
    },
    componentDidMount: function () {
      Waveform();
    }
  })

  React.render(
    <AppView />,
    document.getElementById('app')
  );

})();
