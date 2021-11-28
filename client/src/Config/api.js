import axios from 'axios'

export const instagramAPI = axios.create({
  baseURL: "https://graph.instagram.com",
});

export const API = axios.create({
// base url for deploy to heroku
  // baseURL: "/api/v1/",

// base url for local developing
  baseURL: "http://localhost:5000/api/v1/",

});