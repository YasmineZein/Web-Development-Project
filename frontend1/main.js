
const menuBar = document.getElementById('menuBar');
const menuList = document.getElementById('menuList');

menuBar.addEventListener('click', () => {
    menuList.classList.toggle('active');
});
    

let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    const imageWidth = items[active].offsetWidth; 
    slider.style.left = -imageWidth * active + 'px';
    
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => { next.click() }, 3000);
}

window.onresize = function() {
    reloadSlider();
};

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};





const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbox = document.querySelector(".chatbox");
const faqOptions = document.querySelector(".faq-options");

const faqResponses = {
    1: "We provide web development, app development, and digital marketing services.",
    2: "You can contact support via email at support@example.com or call us at +20xxxxxxxxxx.",
    3: "Our working hours are Monday to Friday, 9 AM to 6 PM.",
    4: "check about us page to know.",
};

faqOptions.addEventListener("click", (event) => {
    const selectedOption = event.target.getAttribute("data-option");
    if (selectedOption) {
        const userMessage = event.target.textContent;
        const botResponse = faqResponses[selectedOption];

        appendMessage(userMessage, "outgoing");

        setTimeout(() => {
            appendMessage(botResponse, "incoming");
        }, 600); 
    }
});

const appendMessage = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    chatLi.innerHTML = className === "outgoing" 
        ? `<p>${message}</p>` 
        : `<span class="fa-solid fa-robot" style="color: #ffffff;"></span><p>${message}</p>`;
    chatbox.appendChild(chatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
};

chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

document.addEventListener("DOMContentLoaded", async function () {
    const productsList = document.getElementById("productsList");
    const centeredMessage = document.querySelector(".centered-message");
    const welcomeMessage = document.querySelector(".welcome-message");
    const API_URL = "https://localhost:7019/api/Product"; 

    async function fetchProducts() {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (data.Success && Array.isArray(data.Data)) {
                return data.Data;
            } else {
                console.error("Invalid API response format:", data);
                return [];
            }
        
    }

    async function initializePage() {
        const products = await fetchProducts();
        displayProducts(products);
    }

    function displayProducts(filteredProducts) {
        productsList.innerHTML = "";

        if (filteredProducts.length === 0) {
            centeredMessage.style.display = "flex";
            welcomeMessage.style.display = "none"; 
        } else {
            centeredMessage.style.display = "none";
            welcomeMessage.style.display = "none";

            filteredProducts.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");

                productDiv.innerHTML = `
                    <a href="Product.html?productId=${product.ProductId}">
                        <img src="https://localhost:7019/${product.ImagePath}" alt="${product.Name}">
                    </a>
                    <h3>${product.Name}</h3>
                    <p>Price: $${product.Price.toFixed(2)}</p>
                `;
                productsList.appendChild(productDiv);
            });
        }
    }

    initializePage();
});





let products = [
    { name: "iPhone 14", category: "Mobile Devices", subcategory: "Smartphones", brand: "Apple", price: 999, image: "https://i.pinimg.com/236x/dc/22/35/dc2235bbb7c5ae968a36e4fd9f3e1941.jpg", href: "Product.html" },
    { name: "Samsung Galaxy S23", category: "Mobile Devices", subcategory: "Smartphones", brand: "Samsung", price: 899, image: "https://i.pinimg.com/236x/31/61/54/3161540e92f74073ba1d6c5acc4da6c3.jpg", href: "Product.html" },
    { name: "Sony WH-1000XM5", category: "Audio Devices", subcategory: "Headphones", brand: "Sony", price: 350, image: "https://i.pinimg.com/474x/4a/6b/8e/4a6b8e1b40d5f1d2bc190325efb2d987.jpg", href: "Product.html" },
    { name: "Dell XPS 13", category: "Laptops & Computers", subcategory: "Laptops", brand: "Dell", price: 1200, image: "https://i.pinimg.com/236x/d2/60/87/d26087affa4669c0c7145b3d8cfbc4e4.jpg", href: "Product.html" },
    { name: "LG 55-inch OLED TV", category: "Televisions & Home Entertainment", subcategory: "Televisions", brand: "LG", price: 1500, image: "https://i.pinimg.com/236x/d2/60/87/d26087affa4669c0c7145b3d8cfbc4e4.jpg", href: "Product.html" },
    { name: "Bose SoundLink Revolve+", category: "Audio Devices", subcategory: "Speakers", brand: "Bose", price: 299, image: "https://i.pinimg.com/236x/51/85/dc/5185dc2de2061aab32df5b8f6da296d1.jpg", href: "Product.html" },
    { name: "Canon EOS 5D Mark IV", category: "Cameras & Photography", subcategory: "DSLR", brand: "Canon", price: 2500, image: "https://i.pinimg.com/236x/b0/ae/72/b0ae727be03ee811721f15fbde6da989.jpg", href: "Product.html" }
];

function populateSubcategories() {
    const mainCategory = document.getElementById("mainCategory").value;
    const subcategorySelect = document.getElementById("subcategory");
    subcategorySelect.innerHTML = '<option value="">-- Select Subcategory --</option>';

    let subcategories = [];
    switch (mainCategory) {
        case "Mobile Devices":
            subcategories = ["Smartphones", "Tablets"];
            break;
        case "Laptops & Computers":
            subcategories = ["Laptops", "Desktops"];
            break;
        case "Audio Devices":
            subcategories = ["Headphones", "Speakers"];
            break;
        case "Televisions & Home Entertainment":
            subcategories = ["Televisions", "Soundbars"];
            break;
        case "Cameras & Photography":
            subcategories = ["Cameras", "Lenses"];
            break;
    }

    subcategories.forEach(subcategory => {
        const option = document.createElement("option");
        option.value = subcategory;
        option.innerText = subcategory;
        subcategorySelect.appendChild(option);
    });
}

function updatePriceRange() {
    const priceRange = document.getElementById("priceRange").value;
    document.getElementById("priceRangeLabel").innerText = `Price: $${priceRange}`;
}

function applyFilters() {
    const mainCategory = document.getElementById("mainCategory").value;
    const subcategory = document.getElementById("subcategory").value;
    const brand = document.getElementById("brand").value;
    const priceRange = document.getElementById("priceRange").value;

    const filteredProducts = products.filter(product => {
        return (
            (!mainCategory || product.category === mainCategory) &&
            (!subcategory || product.subcategory === subcategory) &&
            (!brand || product.brand === brand) &&
            product.price <= priceRange
        );
    });

    displayProducts(filteredProducts);
}

document.addEventListener("DOMContentLoaded", function () {
    const productsList = document.getElementById("productsList");
    const centeredMessage = document.querySelector(".centered-message");
    const welcomeMessage = document.querySelector(".welcome-message");

    // Initial Page State
    if (products.length > 0) {
        welcomeMessage.classList.remove("hidden");
        centeredMessage.style.display = "none";
        displayProducts(products);
    } else {
        centeredMessage.style.display = "flex";
        welcomeMessage.classList.add("hidden");
    }
});

//new addition for filter toggle
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("filterSidebar");

    // Add click event to toggle sidebar visibility
    toggleButton.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
    });
});