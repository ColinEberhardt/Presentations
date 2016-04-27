const API_KEY = 'b51d96d154623744d3e7d2168165d';

const apiRequest = (url, params) =>
  fetch(url + '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&'))
    .then(response => response.text())
    .then(JSON.parse);

export const getGroupInfo = groupName =>
  apiRequest('https://api.meetup.com/' + groupName, {
    key: API_KEY
  });


export const getGroupEvents = (groupName, status) =>
  apiRequest('https://api.meetup.com/2/events', {
    key: API_KEY,
    group_urlname: 'BristolJS',
    status
  });
