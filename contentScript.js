// This ensures that you doing run the functions multiple times on the same page
if(typeof init === 'undefined'){
    const init = function() {
        create_jira_button()
    }
    init();
}


function create_jira_button() {
    // we need to make sure we are running this button on the specific webpage
    let current_url = window.location.href;
    // testing to see if the url is correct
    if (current_url.includes('developer.mozilla.org/en-US/docs/Web/API/Document/querySelector')) {
        // this function can be seen below -> if you want to understand what is happening research promises https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
        // we reference a specific element in the DOM to wait for
        waitForElm('[class="main-menu"]').then((elm) => {
            // this is where you are going to place the button
            // to place it in a specific spot you will need to select the element you want to place it near to
            // you can do this with using document.queryselector('<element>')
            // example - for https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
            // 1 - get the main menu element and save it as a variable to use later
            let mainmenu = document.querySelector('[class="main-menu"]')
            // 2 - Create the button
            let button = document.createElement("button")
            // 3 - give the button attributes
            button.innerHTML = "Jira Button"
            button.id = "jira_button"
            // 4 - append the button to the main menu
            mainmenu.append(button)
        })

    }
}

// This is a useful function to wait for a specific element to appear on the page
// https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
