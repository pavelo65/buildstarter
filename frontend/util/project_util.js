
const ProjectUtil = {
  fetchProjects(callback) {
    $.ajax({
      url: "/api/projects",
      dataType: "json",
      success: function(projects) {
        callback(projects);
      },
      error() {
        console.log('Error fetching Projects');
      }
    });
  },

  fetchProject(id, callback) {
    $.ajax({
      url: `/api/projects/${id}`,
      dataType: "json",
      success: function(project) {
        callback(project)
      },
      error() {
        console.log('Error fetching Projects');
      }
    });
  },

  searchProjects(search, callback) {
    $.ajax({
      url: "/api/projects",
      data: { search: search },
      success: function (projects) {
        callback(projects)
      }
    });
  }
}

module.exports = ProjectUtil;
