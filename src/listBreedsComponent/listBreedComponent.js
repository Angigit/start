import '../css/listBreedsComponent.css';
import ContentComponent from '../contentComponent/contentComponent';

export default class ListBreeds extends ContentComponent{

  constructor() {
    super();
    this.render();
  }

  async getFullList() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    if(response.status === 404) {
      this.displayError('An error occured!');
      return;
    }

    const data = await response.json();
    return data;
  }

  createListItem(title) {
    const item = document.createElement('div');
    item.classList.add('breed-list-item');
    item.innerHTML = title;
    document.querySelector('#content').appendChild(item);
  }

  displayList(results) {
    for(let breed in results.message) {
      if(results.message[breed].lenght !== 0) {
        //van alfaj
        for(let subBread of results.message[breed]) {
          this.createListItem(subBread+' '+breed);
        }   
      } else {
        //nincs alfaj
        this.createListItem(breed);
      }
    }
  }

  render() {
    const button = document.createElement('button');
    button.classList.add('list-button');
    button.innerHTML = 'List Breeds';
    document.querySelector('#header').appendChild(button);
    button.onclick = () => {
      this.clearContent();
      this.getFullList().then((result) => {this.displayList(result);});
    };
  }
}