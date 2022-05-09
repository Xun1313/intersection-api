const options = {
  root: document.body.querySelector('.test-container'),
  rootMargin: '0px 0px 0px 0px',
  threshold: 0.5
}

const callback = (entries, observer) => {
  entries.forEach(e => {
    console.log(e.target.innerText, e);
    // if (e.isIntersecting) {
    //   e.target.classList.add('animation')
    // } else {
    //   e.target.classList.remove('animation')
    //   //observer.unobserve(e.target)
    // }
  })
}

const observer = new IntersectionObserver(callback, options)

document.body.querySelectorAll('.test-container > .test').forEach(e => {
  observer.observe(e)
})