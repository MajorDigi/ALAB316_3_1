document.addEventListener("DOMContentLoaded", () => {
  var menuLinks = [
      { text: 'about', href: '/about' },
      {
          text: 'catalog', href: '#', subLinks: [
              { text: 'all', href: '/catalog/all' },
              { text: 'top selling', href: '/catalog/top' },
              { text: 'search', href: '/catalog/search' },
          ]
      },
      {
          text: 'orders', href: '#', subLinks: [
              { text: 'new', href: '/orders/new' },
              { text: 'pending', href: '/orders/pending' },
              { text: 'history', href: '/orders/history' },
          ]
      },
      {
          text: 'account', href: '#', subLinks: [
              { text: 'profile', href: '/account/profile' },
              { text: 'sign out', href: '/account/signout' },
          ]
      },
  ];

  // 1. Select the main element
  const mainEl = document.querySelector("main");

  // 2. Set background color and content of mainEl
  mainEl.style.backgroundColor = "var(--main-bg)";
  mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
  mainEl.classList.add("flex-ctr");

  // 3. Select the top-menu element and style it
  const topMenuEl = document.getElementById("top-menu");
  topMenuEl.style.height = "100%";
  topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
  topMenuEl.classList.add("flex-around");

  // 4. Create and append links to the topMenuEl
  menuLinks.forEach((link) => {
      const a = document.createElement("a");
      a.setAttribute("href", link.href);
      a.textContent = link.text;
      topMenuEl.appendChild(a);
  });

  // 5. Select the sub-menu element and style it
  const subMenuEL = document.getElementById("sub-menu");
  subMenuEL.style.height = "100%";
  subMenuEL.style.backgroundColor = "var(--sub-menu-bg)";
  subMenuEL.classList.add("flex-around");
  subMenuEL.style.position = "absolute";
  subMenuEL.style.top = "0";

  // 6. Cache topMenuLinks outside the event listeners so it's accessible throughout
  const topMenuLinks = topMenuEl.querySelectorAll("a");

  // Helper function to build the submenu
  function buildSubmenu(subLinks) {
      // Clear the current contents of subMenuEL
      subMenuEL.innerHTML = '';

      // Iterate over subLinks array and create <a> elements
      subLinks.forEach((link) => {
          const a = document.createElement("a");
          a.setAttribute("href", link.href);
          a.textContent = link.text;
          subMenuEL.appendChild(a);
      });
  }

  // Event listener for topMenuEl
  topMenuEl.addEventListener('click', (evt) => {
      evt.preventDefault();

      // Check if the clicked element is an <a> tag
      if (evt.target.tagName !== 'A') return;

      // Remove the active class from all <a> elements in topMenuEl
      topMenuLinks.forEach(link => link.classList.remove('active'));

      // Add the active class to the clicked <a> element
      evt.target.classList.add('active');
      console.log(`Active link: ${evt.target.textContent}`);

      // Find the clicked link object in menuLinks
      const clickedLink = menuLinks.find(link => link.text === evt.target.textContent);

      // Show/hide the submenu if subLinks exist
      if (clickedLink && clickedLink.subLinks) {
          // If submenu is already shown, hide it; otherwise, show it
          if (subMenuEL.style.top === "100%") {
              subMenuEL.style.top = "0";
          } else {
              buildSubmenu(clickedLink.subLinks);
              subMenuEL.style.top = "100%";
          }
      } else {
          // Hide submenu if no subLinks exist
          subMenuEL.style.top = "0";
      }
  });

  // Event listener for subMenuEL for handling clicks on submenu items
  subMenuEL.addEventListener('click', (evt) => {
      evt.preventDefault();

      // Check if the clicked element is an <a> tag
      if (evt.target.tagName !== 'A') return;

      // Log the content of the clicked <a> element
      console.log(`Submenu item clicked: ${evt.target.textContent}`);

      // Hide the submenu
      subMenuEL.style.top = "0";

      // Remove the active class from all <a> elements in topMenuEl
      topMenuLinks.forEach(link => link.classList.remove('active'));

      // Update the contents of mainEl with the clicked submenu item
      mainEl.innerHTML = `<h1>${evt.target.textContent}</h1>`;
  });
});

