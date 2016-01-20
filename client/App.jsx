// App component - represents the whole app
App = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
   return {
     links: Links.find({}, {sort: {createdAt: -1}}).fetch()
   }
  },

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    var title = React.findDOMNode(this.refs.LinkTitle).value.trim();
    var url = React.findDOMNode(this.refs.LinkUrl).value.trim();

    Links.insert({
      url: url,
      title: title,
      createdAt: new Date() // current time
    });

    // Clear form
    React.findDOMNode(this.refs.LinkUrl).value = "";
    React.findDOMNode(this.refs.LinkTitle).value = "";
  },

  renderLinks() {
   // Get links from this.data.links
   return this.data.links.map((link) => {
     return <Link key={link._id} link={link} />;
   });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>UX Links</h1>

          <form className="new-link" onSubmit={this.handleSubmit} >
            <input
              type="text"
              ref="LinkTitle"
              placeholder="Title" />

             <input
               type="text"
               ref="LinkUrl"
               placeholder="Paste new url" />

               <input
                 type="submit"
                 value="Submit Link" />

           </form>
        </header>

        <ul>
          {this.renderLinks()}
        </ul>
      </div>
    );
  }
});
