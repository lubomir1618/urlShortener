document.addEventListener('DOMContentLoaded', () => {

  const LOCATION = document.location.href;
  const VALID_URL = 'Please put valid URL.';
  const CAN_NOT_ADD = 'Can not add address.';
  const SLUG_EXISTS = 'This customized link already exists.';

  const shorten = document.querySelector('#shorten') as HTMLButtonElement;
  const url = document.querySelector('#url') as HTMLInputElement;
  const customize = document.querySelector('#customize') as HTMLInputElement;
  const slug = document.querySelector('#slug') as HTMLInputElement;
  const info = document.querySelector('#info') as HTMLDivElement;
  const loading = document.querySelector('#loading') as HTMLDivElement;
  const copy = document.querySelector('#copy') as HTMLDivElement;

  let createdLink: string = '';

  getStatistics() ; // @TODO move it

  shorten.addEventListener('click', () => {
    loading.style.display = 'block';

    if (isValidURL(url.value)) {
      if (slug.value) {
        slugExists(slug.value, url.value);
      } else {
        getShortenURL(url.value);
      }
      info.innerHTML = '';
    } else {
      info.innerHTML = VALID_URL;
      copy.style.display = 'none';
      loading.style.display = 'none';
    }
  })

  customize.addEventListener('click', () => {
    if (customize.checked) {
      slug.removeAttribute('disabled')
    } else {
      slug.setAttribute('disabled', '');
    }
  })

  copy.addEventListener('click', () => {
    if (createdLink) {
      navigator.clipboard.writeText(createdLink)
        .then((() => {
          info.innerHTML = `${info.innerHTML} - copied to clipboard`;
        }))
        .catch(err => {
          console.log(`Can not copy ${createdLink} to clipboard`, err);
        });
    }
  })

  function getShortenURL(urlToShorten: string, slugToAdd?: string) {
    const options = { 
      method: 'POST',
      body: `{"url": "${urlToShorten}"}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    if (slugToAdd) {
      options.body = `{"url": "${urlToShorten}", "slug": "${slugToAdd}"}`;
    }

    fetch(`${LOCATION}url`, options)
      .then(response => response.json())
      .then(response => {
        if (response.newURL) {
          const address = `${LOCATION}${response.newURL.slug}`;
          createdLink = address;
          info.innerHTML = `<a href="${address}" title="${address}" target="_blank">${address}</a>`;
          copy.style.display = 'block';
          loading.style.display = 'none';
        } else {
          info.innerHTML = CAN_NOT_ADD;
          loading.style.display = 'none';
        }
        url.value = '';
        slug.value = '';
      })
      .catch(err => {
        info.innerHTML = CAN_NOT_ADD;
        loading.style.display = 'none';
        console.log(CAN_NOT_ADD, err);
      }); 
  }

  function slugExists(slug : string, url: string) {
    const options = { 
      method: 'POST',
      body: `{"slug": "${slug}"}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    fetch(`${LOCATION}slug`, options)
      .then(response => response.json())
      .then(response => {
        if (response && !response.result) {
          getShortenURL(url, slug);
        } else {
          info.innerHTML = SLUG_EXISTS;
          copy.style.display = 'none';
          loading.style.display = 'none';
        }
      })
      .catch(err => {
        info.innerHTML = CAN_NOT_ADD;
        loading.style.display = 'none';
        console.log(CAN_NOT_ADD, err);
      }); 
  }


  function getStatistics(): void {
    const options = { 
      method: 'POST',
      body: '',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    fetch(`${LOCATION}statistics`, options)
      .then(response => response.json())
      .then(response => {
        if (response) {
          prepareStatistics(response);
        } else {
          console.log('statistics error');
        }
      })
      .catch(err => {
        console.log('statistics error', err);
      }); 
  }

  function isValidURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }
});

function prepareStatistics(statistics: any): void { // @TODO check type
  if (statistics.length > 0) {
    console.log('stats', statistics);
  }
}
