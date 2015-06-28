var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var VisualizationList = React.createClass({

  _sortOptions: ['name', 'created_at', 'updated_at'],

  getInitialState: function(){
    return { sortBy: this._sortOptions[0], filterText: '' }
  },
  
  componentDidMount: function(){
    slipHover(this.refs.container.getDOMNode());
  },

  postNewViz: function() {

    var newViz = Visualization.createOne();
    this.props.changePage('Edit');
    this.props.changeVisualization(newViz);
  },

  changeSort: function (sortOption) {
    this.setState({sortBy: sortOption});
  },

  handleFilterInput: function(filterText){
    console.log("handleFilterInput: ", filterText);
    this.setState({
      filterText: filterText
    });
  },

// TODO: Add back in sort into return {sortButtons}
 
  render: function(){
    var props = this.props;
    var self = this;
    var items = _.sortBy(Visualization.getAll(), function(viz){return viz[self.state.sortBy]});
    items = items.filter(function(viz){
      console.log(self.state.filterText.toLowerCase());
      return viz.name.toLowerCase().indexOf(self.state.filterText.toLowerCase()) > -1;
    })
    items = items.map(function(viz){
      return <VisualizationItem 
        viz={viz} 
        key={ "visualization-item-" + viz.id} 
        changePage={self.props.changePage}
        url = "http://lorempixel.com/250/250/fashion"
        changeVisualization={self.props.changeVisualization} />;
    })

    // var sortButtons = _.map(self._sortOptions, function(sortOption){
    //   return <div className="sort-button" onClick={function(){
    //     self.setState({sortBy: sortOption});
    //   }}>{sortOption}</div>;
    // })
    return (
      <div>
        <div id="header">
          <h1 className="logo-text">NWMP</h1>
          <SearchBar filterText={this.state.filterText} onFilterInput={this.handleFilterInput} />
          <img id="sort-icon" src="../img/sortIcon.svg" />
          <SortMenu sortOptions={ this._sortOptions } changeSort={ this.changeSort } />
          <div id="btn-new-viz" onClick={this.postNewViz}>
            Create New Visualization
          </div>
        </div>
        <div id="container" ref="container">
            {items}
        </div>
      </div>
    )
  }
});

Visualization.registerChangeCallback(function () {
  React.render( < AppView />, document.getElementById('app'))
})