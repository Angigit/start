import '../css/searchImageComponent.css';
import ContentComponent from '../contentComponent/contentComponent';

export default class SearchImage extends ContentComponent {
  
  constructor() {
    super();
    this.render();
  }

  async getImages(dogbreed) {
    if(!dogbreed) {
      this.displayError('Please enter a dog breed first!');
      return;
    }
    dogbreed = dogbreed.split(' ');
    let urlString;
    if(dogbreed.length === 1) {
      urlString = `https://dog.ceo/api/breed/${dogbreed}/images`;
    } else if(dogbreed.length === 2) {
      urlString = `https://dog.ceo/api/breed/${dogbreed[1]}/${dogbreed[0]}/images`;
    }

    const response = await fetch(urlString);

    if(response.status === 404) {
      this.displayError('Sorry breed not found!');
      return;
    }
    const data = await response.json();
    return data;
  }

  displayImages(result) {
    const image = document.createElement('img');
    const randomElement = Math.floor(Math.random()* result.message.length);
    image.src = result.message[randomElement];
    this.clearErrors();
    this.clearContent();
    document.querySelector('#content').appendChild(image);
  }

  render() {
    const markup = `
   <form class="dog-search">
     <span class="search-icon"></span>
     <input type="text" id="dogSearchInput">
     <button>Search</button>
   </form>
  `;
    document.querySelector('#header').insertAdjacentHTML('beforeend', markup);

    document.querySelector('.dog-search button').addEventListener('click', (event) => {
      //meggátolja az alapért működést nem fog újratöltődni az oldal a form esetén
      event.preventDefault();
      const inputValue = document.querySelector('#dogSearchInput').value;
      this.getImages(inputValue).then((result) => {
        if(result) {
          this.displayImages(result);
        }
      });
    });
  }
}


  
