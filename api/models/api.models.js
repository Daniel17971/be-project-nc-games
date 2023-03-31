const endpointsData = require("../../endpoints.json");

exports.fetchEndpoints = () => {
  return Promise.all([endpointsData]);
};
