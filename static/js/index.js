import "babel-polyfill";

function setGreetings(msg){
  document.querySelector('.card_greetings').innerHTML = msg;
}

function setBody(msg){
  document.querySelector('#body').innerHTML = msg;
}

const fetchPM =  async (hash) => {
	return await fetch(`/pm/${hash}`, { method: 'GET' }).then(res => res.json());
};

const main = async () => {
  const hash = window.location.href.substring(window.location.origin.length + 1);
  const pm = await fetchPM(hash);
  setGreetings(`Dear ${pm.name},`);
  setBody(pm.body);
};

main().then();
