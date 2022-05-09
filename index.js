const mouse = document.querySelector('.mouse');
const toTop = document.querySelector('.to-top');

mouse.addEventListener('click',function(){
  window.scrollBy({
    top: window.innerHeight,
    behavior: 'smooth'
  });
})

const imgWrapper = document.querySelector('.img-wrapper');

// 偵測滑動
//2.設定選項
const options = {
  root: null,// 預設以瀏覽器的 viewport 為範圍，必須要是所有目標元素的父元素（或祖父層的元素）
  rootMargin: '0px 0px 0px 0px',// 設定 root 周圍的 margin，影響當下座標觸發
  threshold: 0// 可見度達到多少比例時，觸發 callback 函式，0代表立刻
}

//3.選定要觀察的對象
const shapes = document.querySelectorAll('.shape')
const images = document.querySelectorAll('.img')


//4.設定call back
const callback = (entries, observer) => {
  // entries 是剛進入的和離開的 intersection object
  entries.forEach(entry => {
    console.log(entry);
    // target: 哪個目標元素進入或離開了 viewport
    // isIntersecting: 判別目標元素是否進入或離開了(boolean) viewport
    // boundingClientRect: 目標元素的 getBoundingClientRect(有可能是自定義開啟前後的差異寬高座標)
    // rootBounds: 用來觀察的盒子 (root + rootMargin)的 getBoundingClientRect
    // intersectionRect: 目標元素和盒子重疊的區塊

    // 補充: getBoundingClientRect 等於 boundingClientRect 是相對於 viewport 的座標位置
    // top 和 y 是一樣的
    // 不受 root 影響，一定是依照 viewport 為準，會受往下 scroll top 和 y 變負值
    // 確實裡面不提供 offsetTop，但現在已經有 callback 的機制偵測進入和出去，就不需要 offsetTop 才對
    // https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E8%AA%8D%E8%AD%98-intersection-observer-api-%E5%AF%A6%E4%BD%9C-lazy-loading-%E5%92%8C-infinite-scroll-c8d434ad218c
    if (!entry.isIntersecting) return
    entry.target.classList.add('animation');
    // stop observing this element
    observer.unobserve(entry.target)
    // 使用在 lazy loading 上記得解除，釋放資源
  })
}

//1.創建新的觀察
let observer = new IntersectionObserver(callback, options);
// 非同步觀察一個或多個目標元素進出指定的外層或 viewport 的變化
// 取代 scroll 事件，使用到特定 element api 會造成 reflow
// Lazy Loading: 記得 unobserve，釋放資源
// 例子: 圖片(本來就存在的靜態內容列表)
// Infinite Scroll: 一樣要 unobserve 才能避免再次滾到此處重複呼叫 api 的可能
// 例子: api 內容一直往下增加(youtube)

// callback：當目標元素進入和離開指定外層或預設 viewport 時觸發，另外它在主執行緒上運行，避免在函式中執行高成本或耗費時間的工作
// options：設定和控制在哪些情況下，呼叫 callback 函式

// observe 綁定
// unobserve 解除綁定
images.forEach((target) => {
  observer.observe(target)
})
shapes.forEach((shape) => {
  observer.observe(shape)
})


toTop.addEventListener('click',function(){
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
})
