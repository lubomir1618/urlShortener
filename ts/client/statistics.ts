document.addEventListener('DOMContentLoaded', () => {

  const ORIGIN = document.location.origin;
  const table = document.querySelector('#table') as HTMLDivElement;

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
      const columns = ['Address', 'Shorten address', 'Date', 'Visits'];
      let data: any[] = [];

      statistics.forEach((item: any) => {
        let row: any[] = [ item.url, `${ORIGIN}/${item.slug}`, new Date(item.date).toLocaleDateString(), item.visits ];
        data.push(row);
      });

      let dataTable = document.createElement('table');
      let headerRow = document.createElement('tr');

      columns.forEach(item => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(item);
        header.appendChild(textNode);
        headerRow.appendChild(header);
      });

      dataTable.appendChild(headerRow);

      data.forEach((stat: any) => {
        let row = document.createElement('tr');

        stat.forEach((text: any) => {
          let cell = document.createElement('td');
          let textNode = document.createTextNode(text);
          cell.appendChild(textNode);
          row.appendChild(cell);
        })
        
        dataTable.appendChild(row);
      });

      table.appendChild(dataTable);
    }
  }
});
