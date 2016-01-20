// Task component - represents a single todo item
Link = React.createClass({
  propTypes: {
    link: React.PropTypes.object.isRequired
  },

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Links.update(this.props.link._id, {
      $set: {checked: ! this.props.link.checked}
    });
  },

  deleteThisLink() {
    Links.remove(this.props.link._id);
  },

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const linkClassName = this.props.link.checked ? "checked" : "";

    return (
      <li className={linkClassName}>
        <button className="delete" onClick={this.deleteThisLink}>
          &times;
        </button>

        <span className="linkTitle">{this.props.link.title}</span>
        <span className="linkURL">{this.props.link.url}</span>
      </li>
    );
  }
});
