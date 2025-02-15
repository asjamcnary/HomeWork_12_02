let cars = []

function clearTable() {
    document.getElementById("table-cars-headers").innerHTML = ""
    document.getElementById("table-cars-body").innerHTML = ""
}

function loadRentalTable() {
    clearTable()
    cars = [...carsForRental]
    renderTable(cars)
}

function loadSaleTable() {
    clearTable()
    cars = [...carsForSale]
    renderTable(cars)
}

function loadAllTables() {
    clearTable()
    cars = [...carsForRental, ...carsForSale]
    renderTable(cars)
}

function loadSearchTablesByHorsepower() {
    clearTable()
    const carsSearch = searchCars(cars, 'Horsepower')
    renderTable(carsSearch)
}
function loadSearchTablesByAcceleration() {
    clearTable()
    const carsSearch = searchCars(cars, 'Acceleration')
    renderTable(carsSearch)
}
function loadSearchTablesByWeight_in_lbs() {
    clearTable()
    const carsSearch = searchCars(cars, 'Weight_in_lbs')
    renderTable(carsSearch)
}
function loadSearchTablesByCylinders() {
    clearTable()
    const carsSearch = searchCars(cars, 'Cylinders')
    renderTable(carsSearch)
}

function renderTable(cars) {
    if (!cars) return
    const firstElement = cars[0]
    const fields = Object.keys(firstElement)
    const theadTr = document.getElementById("table-cars-headers")
    if (theadTr) {
        for (let index = 0; index < fields.length; index++) {
            const th = document.createElement("th")
            th.innerText = fields[index].replaceAll("_", " ")
            theadTr.append(th)
        }
        theadTr.append(getTD("Actions", "", "th"))
    }
    const tBody = document.getElementById("table-cars-body")
    if (tBody) {
        for (let index = 0; index < cars.length; index++) {
            const currentCar = cars[index];
            const tr = document.createElement("tr")
            tr.id = `${currentCar.Name.replaceAll(" ", "-")}-${index}`
            for (let index = 0; index < fields.length; index++) {
                const currentField = fields[index];
                tr.append(getTD(currentCar[currentField], "-"))
            }

            const tdButton = getTdButton()
            tr.append(tdButton)
            tBody.append(tr)
        }
    }
}

function getTdButton() {
    const button = document.createElement("button")
    button.classList.add("btn", "btn-danger")

    const icon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
    </svg>
    `
    button.innerHTML = icon

    button.onclick = function () {
        console.log(this.parentElement.parentElement.remove())
    }
    const tdButton = document.createElement("td")
    tdButton.append(button)
    return tdButton
}

function getTD(value, defaultValue = "", type = "td") {
    const currentTD = document.createElement(type)
    currentTD.innerHTML = value || defaultValue
    return currentTD
}

function searchCars(cars, id) {
    if (!cars.length) return
    if (!id) return
    const search = +document.getElementById(id).value
    if (!search) return
    const result = []
    for (let i = 0; i < cars.length; i++) {
        if (cars[i][id] === search) result.push(cars[i])
    }
    return result
}