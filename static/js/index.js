import "babel-polyfill";

const removeClass = (elem, cls) => elem.className = elem.className.split(/\s+/g).filter(c => c !== cls).join(' ');

const addClass = (elem, ...clses) => elem.className = [
  ...elem.className.split(/\s+/g),
  ...clses,
].join(' ');

function setGreetings(msg){
  document.querySelector('.card_greetings').innerHTML = msg;
}

function setBody(msg){
  document.querySelector('#body').innerHTML = msg;
}

function showCard(){
  const card = document.querySelector('.card');
  addClass(card, 'slideInLeft');
  removeClass(card, 'hide');
}

function finishLoading(){
  const loading = document.querySelector('.loading');
  addClass(loading, 'slideOutRight');
  loading.remove();
}

const fetchPM =  async (hash) => {
	return await fetch(`/pm/${hash}`, { method: 'GET' }).then(res => res.json());
};

const main = async () => {
  const hash = window.location.href.substring(window.location.origin.length + 1);
  if(hash) {
    const pm = await fetchPM(hash);
    setGreetings(`Dear ${pm.name},`);
    setBody(pm.body);
  }
  finishLoading();
  showCard();
};

main().then();
