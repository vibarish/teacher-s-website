export default {
  mounted(el) {
    console.log('el', el);
    // el.style.background = 'red';
    let html = el.textContent.replace(/#{3}\s?([^\n]+)\n/g,'Replaced');
    el.innerHTML = html;  
    // el.textContent = 'Replaced';
  }
}