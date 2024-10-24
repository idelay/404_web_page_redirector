chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    console.log("[DEBUG] Page loaded!");

    get404WithTimeout();
  }
})


const functions = {
  getNewURLLOC,
  getNewURLWayback
};


async function get404WithTimeout() {
  console.log("[DEBUG] get404WithTimeout()");
  url = await getCurrentPageURL();
  const timeout = 5000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { method: "GET", signal: controller.signal });
    if (response.status === 404) {
      console.log(`O URL: ${url} não está funcionando.`);

      const lista = ['getNewURLLOC', 'getNewURLWayback'];

      for (const funcName of lista) {
        if (typeof functions[funcName] === 'function') {
          const passed = await functions[funcName](url);
          if(passed) return;
        }
      }

    } else {
      console.log(`O URL: ${url} está funcionando.`);
    }

  } catch (error) {
    if (error.name === "AbortError") {
      console.log(`O URL: ${url} excedeu o tempo limite.`);
    } else {
      console.log(`O URL: ${url} talvez não exista.`);
    }

  } finally {
    clearTimeout(timeoutId);
  }
}


function updateCurrentPageURL(newURL) {
  console.log("[DEBUG] updateCurrentPageURL");

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tabId = tabs[0].id;
    chrome.tabs.update(tabId, { url: newURL });
  });
}


function getCurrentPageURL() {
  console.log("[DEBUG] getCurrentPageURL");

  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs && tabs.length > 0) {
        const currentURL = tabs[0].url;
        resolve(currentURL);
      } else {
        console.log("[ERROR] getCurrentPageURL");
      }
    });
  });
}


async function getNewURLWayback(url) {
  try {
    console.log("[DEBUG] getNewURLWayback");
    url = url.replace("https://", "").replace("http://", "");
    console.log(url);

    const response = await fetch(`http://archive.org/wayback/available?url=${url}`, { method: "GET", timeout: 5000 });
    const responseData = await response.json();

    if(!responseData?.archived_snapshots.closest?.url) return false;
    updateCurrentPageURL(responseData.archived_snapshots.closest.url);

    console.log("[DEBUG] New page loaded with Wayback!");

  } catch (error) {
    console.log("[ERROR] getNewURLWayback");
  }
}


async function getData(URL) {
  try {
    console.log("[DEBUG] getData")
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }

    const data = await response.json();

    if (Object.keys(data['results.0']).length === 0) {
      return false;
    }

    const date = data['results.0'].dates[0].split(" ")[2].replace("]", '');
    const newURL = data['results.0'].resources[0].url.replace("*", date);

    updateCurrentPageURL(newURL);
    console.log("[DEBUG] New page loaded with LOC!");
    return true;

  } catch (error) {
    console.error('Erro:', error);
    return false;
  }
}


async function getNewURLLOC(url) {
  console.log("[DEBUG] GetNewURLLoc");
  const target = `https://www.loc.gov/web-archives/?q=${url}&fo=json&at=results.0`;

  const dataAvailable = await getData(target);
  if (!dataAvailable) {
    console.log("[DEBUG] URL not available in LOC");
    return false;
  }
  console.log("[DEBUG] URL available in LOC");
  return true;
}