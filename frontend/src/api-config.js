let base;
if (window.location.href.includes('localhost')) {
    base = 'http://localhost:8000';
} else {
    base = 'https://social-network-insta-api.herokuapp.com';
}
console.log(base);
export const API_URL = `${base}/api/v1/`;
export const IMAGES_URL = `${base}/images/`;