(() => {
    let newTab = "";

    chrome.runtime.onMessage.addListener(async(obj, sender, response) => {
        const { type, url } = obj;

        if (type === "NEW") {
            newTab = url;

            // newUrl();
        }
        else if (type === "UPDATE"){
            console.log("kami")
        }
    });

  
})
 