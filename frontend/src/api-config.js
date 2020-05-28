let backendHost, images;
if (window.location.href.includes('localhost')) {
    backendHost = 'http://localhost:8000/api/v1';
    images = 'http://localhost:8000';
} else {
    backendHost = 'https://social-network-insta-api.herokuapp.com';
    images = 'https://social-network-insta-api.herokuapp.com'
}
console.log(backendHost)
export const API_URL = `${backendHost}/`;
export const IMAGES_URL = `${images}/images/`;