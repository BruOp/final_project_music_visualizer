var EffectCheckBox = React.createClass({
  render: function() {
    return (<input type="checkbox" name="effect" value={this.props.effectValue} onChange={this.props.toggleEffect}>
    <label>{this.props.effectName}</label>)
  }
})