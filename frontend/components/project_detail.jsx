//React
const React = require('react');
const ReactDOM = require('react-dom');
const Link = require('react-router').Link;
const ProjectStore = require('../stores/project_store');
const ProjectActions = require('../actions/project_actions');

const ProjectDetail = React.createClass({
  getInitialState() {
    return ({project: {}})
  },

  componentDidMount() {
    this.projectListener = ProjectStore.addListener(this.onChange)
    ProjectActions.fetchProject(this.props.params.projectId)
  },

  componentWillUnmount() {
    this.projectListener.remove();
  },

  onChange() {
    this.setState({project: ProjectStore.find(this.props.params.projectId)})
  },

  render() {
    return (
      <div className="project-detail">
        <h1 className="project-detail-title">{this.state.project.name}</h1>

        <div className="project-detail-media">
          <img alt="Project image" className="project-media" src={this.state.project.media_url}></img>
        </div>

        <div className="project-detail-stats">

        </div>

        <button className="invest-button">Invest</button>

        <div className="project-detail-description">
          {this.state.project.description}
        </div>
      </div>
    )
  }
});

module.exports = ProjectDetail;