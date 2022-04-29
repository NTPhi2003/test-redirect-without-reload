
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");

const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const p3 = document.getElementById("p3");
const home = document.getElementById("home");


btn1.addEventListener("click", () => {
  window.push({ to: "page1" }, "/page1");
});
btn2.addEventListener("click", () => {
  window.push({ to: "page2" }, "/page2");
});
btn3.addEventListener("click", () => {
  window.push({ to: "page3" }, "/page3");
});



/**
 * logic router - Phi baby should refer to it
 *  */ 

// should not display or not an element, should create then mount it to dom. but whatever =)))
function render(element, restElement){
  element.style.display = "block"
  restElement.forEach(element => {
    element.style.display = "none"
  });
}


// call router 
window.addEventListener('popstate', router)

window.addEventListener("onPush", router, false)
window.push = function(state, path){
  window.history.pushState(state, "", path)
  const onPush = new CustomEvent("onPush", {detail : { state, path }})
  window.dispatchEvent(onPush)
}
// 

// router
function router(e){
  let state
  if(e instanceof CustomEvent){
    state = e.detail.state
  }
  if(e instanceof PopStateEvent){
    state = e.state
  }

  // render home (public page)
  if(state === null || state.to === ""){
    render(home, [p1, p2, p3])
  }
  if(state.to === "page1"){
    render(p1, [home, p2, p3])
  }
  if(state.to === "page2"){
    render(p2, [home, p1, p3])
  }
  if(state.to === "page3"){
    render(p3, [home, p2, p1])
  }

}
