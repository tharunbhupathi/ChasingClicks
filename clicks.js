let clickCount = localStorage.getItem('clickCount') || 0;
        let geographyData = JSON.parse(localStorage.getItem('geographyData')) || {};

        document.getElementById('count').textContent = clickCount;

        function updateGeographyTable() {
            let geographyTable = document.getElementById('geographyTable');
            geographyTable.innerHTML = `
                <tr>
                    <th>Country</th>
                    <th>Click Count</th>
                </tr>
            `;
            for (let country in geographyData) {
                geographyTable.innerHTML += `
                    <tr>
                        <td>${country}</td>
                        <td>${geographyData[country]}</td>
                    </tr>
                `;
            }
        }

        updateGeographyTable();

function incrementCount() {
    clickCount++;
    document.getElementById('count').textContent = clickCount;

    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            let city = data.city;
            let country = data.country_name;
            let location = city + ', ' + country; // Update to include city and country
            if (geographyData.hasOwnProperty(location)) { // Update to use location as key
                geographyData[location]++;
            } else {
                geographyData[location] = 1;
            }
            localStorage.setItem('clickCount', clickCount);
            localStorage.setItem('geographyData', JSON.stringify(geographyData));
            updateGeographyTable();
        })
        .catch(error => console.error(error));
}


function resetCounts() {
    clickCount = 0;
    geographyData = {};
    document.getElementById('count').textContent = clickCount;
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('geographyData', JSON.stringify(geographyData));
    updateGeographyTable();
}
