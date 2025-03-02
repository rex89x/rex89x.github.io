/**
* Template Name: iPortfolio
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
const binId = "67c41ba4ad19ca34f8150b5a"; // 請替換成你的 JSONBin ID
const apiKey = "$2a$10$Nxhctxp9N0JLldb2XRCB3uJQOnUyR60saiD0qdcdCYapeuBBce/i2";   // 請替換成你的 API Key
const apiUrl = `https://api.jsonbin.io/v3/b/${binId}`;

(function() {
  "use strict";

  
  /**
   * Viewer Count
   */
  updateViewCount();
  
  /**
   * Define Variables
   */
  const btnContactMe = document.getElementById("submit_contact");

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Form submit
   */
  const form = document.getElementById('contactForm');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = {
        "inputName": document.getElementById("inputName").value,
        "inputEmail": document.getElementById("inputEmail").value,
        "inputTitle": document.getElementById("inputTitle").value,
        "inputQuestion": document.getElementById("inputQuestion").value,
      };

      const scriptID = "AKfycbwl2qd8DBaQe6v9ZMKNbZ36x_PKuYQcEru_mdXV2Ad1Q8xUq7bS3UxASTepQYUdYkwW"
      const apiUrl = `https://script.google.com/macros/s/${scriptID}/exec`;

      await fetch(apiUrl, {
        redirect: "follow",
        method: 'POST',
        body: JSON.stringify({
          inputName: document.getElementById("inputName").value,
          inputEmail: document.getElementById("inputEmail").value,
          inputTitle: document.getElementById("inputTitle").value,
          inputQuestion: document.getElementById("inputQuestion").value
        }),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        }
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          alert("表單已成功傳送！");
          form.reset();
        })
        .catch((error) => {
          alert("表單傳送失敗！");
          console.log(error);
        })
    })


  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()


async function updateViewCount() {
  try {
    console.log("Fetching view count..."); // ✅ 偵錯用
    let response = await fetch(apiUrl, {
      method: "GET",
      headers: { "X-Master-Key": apiKey }
    });

    if (!response.ok) {
      throw new Error(`獲取數據失敗，狀態碼: ${response.status}`);
    }

    let data = await response.json();
    console.log("API Response:", data); // ✅ 偵錯用，看看 data 是否正確

    let currentViews = data.record?.views || 0; // 確保數據存在
    let newViews = currentViews + 1;

    console.log(`Current Views: ${currentViews}, New Views: ${newViews}`); // ✅ 偵錯用

    // 更新新的瀏覽次數
    let updateResponse = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": apiKey
      },
      body: JSON.stringify({ views: newViews })
    });

    if (!updateResponse.ok) {
      throw new Error(`更新數據失敗，狀態碼: ${updateResponse.status}`);
    }

    console.log("View count updated successfully!"); // ✅ 偵錯用

    // ✅ 確保正確更新 HTML
    document.querySelectorAll("#viewerCount").forEach(el => el.textContent = newViews);
  } catch (error) {
    console.error("瀏覽次數更新失敗:", error);
  }
}

// https://docs.google.com/forms/d/e/1FAIpQLSerrnf02zF3jY_RGsQ_Xhc6ZK-v8Eb_F3JASdQ-rETRzNZqFQ/viewform?usp=sf_link
/*
function btnContactMeFunc() {
    let msgConfirm = confirm('確定傳送？');
    if (msgConfirm) {
        sendFormData();
        //location.reload();
    }
}

function sendFormData() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      const scriptID = "AKfycbwl2qd8DBaQe6v9ZMKNbZ36x_PKuYQcEru_mdXV2Ad1Q8xUq7bS3UxASTepQYUdYkwW"
      const apiUrl = `https://script.google.com/macros/s/${scriptID}/exec`;

      await fetch(apiUrl, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          alert("表單已成功傳送！");
          form.reset();
        })
        .catch((error) => {
          alert("表單傳送失敗！");
          console.log(error);
        })
    })
}

function encodeFormData(data) {
    var encodedData = "";
    for (var key in data) {
        if (encodedData !== "") {
            encodedData += "&";
        }
        encodedData += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }
    return encodedData;
}
*/

/*
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // 防止表單提交的預設行為

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // 將表單資料送至 Google Cloud Form 的網址
    var url = "https://docs.google.com/forms/d/e/your_form_id/formResponse";
    
    // 設定 POST 請求的資料
    var data = {
        "entry.your_name_field_id": name,
        "entry.your_email_field_id": email,
        "entry.your_message_field_id": message
    };
    
    // 使用 XMLHttpRequest 發送 POST 請求
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("表單已成功提交！");
        } else {
            alert("表單提交失敗！");
        }
    };
    xhr.send(encodeFormData(data));
});

// 將 JavaScript 物件編碼為表單資料格式
function encodeFormData(data) {
      var encodedData = "";
      for (var key in data) {
          if (encodedData !== "") {
              encodedData += "&";
          }
          encodedData += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
      }
      return encodedData;
  }
*/