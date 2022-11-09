document.addEventListener('DOMContentLoaded', () => {

  const ORIGIN = document.location.origin;
  const dataTable = document.querySelector('#table') as HTMLDivElement;

  getStatistics() ;

  function getStatistics(): void {
    const options = { 
      method: 'POST',
      body: '',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    fetch(`/statistics`, options)
      .then(response => response.json())
      .then(response => {
        if (response) {
          renderDataTable(response);
        } else {
          console.log('statistics error');
        }
      })
      .catch(err => {
        console.log('statistics error', err);
      }); 
  }


  function renderDataTable(statistics: any): void {
    if (statistics.length > 0) {
      columns: ['Address', 'Shorten address', 'Date', 'Visits']
      let data: any[] = [];

      // let row: any[] = [item.url, `${ORIGIN}/${item.slug}`, new Date(item.date).toLocaleDateString(), item.visits ];

      console.log('stats', statistics, data);
    }
  }
});

