const MOCK_DATA = {
    "client": {
        name: "Sandra",
        lastName: "Bullock",
        email: "totally.real.sandra.bullock.email@realaccounts.com",
        role: "profesora",
        hashedPassword: "password",
    },
    "business": {
        name: "Caprioli",
        email: "caprioli@comida.cara.cl",
        location: "San Joaquín",
        hashedPassword: "pene"
    },
    "restaurant": {
        businessId: 1,
        name: "Caprioli",
        location: "Construcción Civil, San Joaquín",
        quality: "★★★☆☆",
        speed: "★★☆☆☆",
        category: "Cafetería",
        imgs: [
            "https://chefandhotel.cl/images/ediciones/2017_02/cabrioli/Caprioli_1.jpg",
            "https://imgs-akamai.mnstatic.com/44/e1/44e1f85e4b5bb16b729e433632ef673d.jpg?quality=75&format=pjpg&fit=bounds&width=980&height=880",
            "data:image/jpeg;base64,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"

        ],
        checkList: {
            "Para llevar": true,
            "Comer en el Lugar": true,
            "Ambiente cerrado": true,
            "Ambiente abierto": true,
            "Espacio estudio": true,
        },
    },
    "review": {
        "clientId": 1,
        "restaurantId": 1,
        "score": 3.0,
        "title": "Meh",
        "text": "I've had better.",
    }
};

async function fetchAll() {
    let r = await fetch("http://localhost:3000/api/buyer/all");
    return await r.json();
}
async function postClient(client) {
    let r = await fetch("http://localhost:3000/api/buyer/", {
        method: "POST",
        body: JSON.stringify(client),
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await r.json();
}
async function putClient(client) {
    let r = await fetch(`http://localhost:3000/api/client/${client.id}`, {
        method: "PUT",
        body: JSON.stringify(client),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await r.json();
}
async function deleteClient(client) {
    let r = await fetch(`http://localhost:3000/api/client/${client.id}`, {
        method: "DELETE",
    });
    return await r.json();
}
async function clientCount() {
    let all = await fetchAll();
    return all.length;
}

async function testClient() {
    let count = await clientCount();

    let newClient = await postClient(MOCK_DATA.client);
    assert(!newClient.error, `failed creating client ${newClient.error}`);


    let newCount = await clientCount();
    assert(count + 1 == newCount, `count should have incremented, old: ${count}, new: ${newCount}`);

    newClient.role = "estudiante";
    let updatedClient = await putClient(newClient);
    assert(newClient.role == updatedClient.role, `roles should be estudiante, got client = ${JSON.stringify(updatedClient.role)}`);

    await deleteClient(updatedClient);
    newCount = await clientCount();
    assert(count == newCount, `count should be equal, old: ${count}, new: ${newCount}`);
    console.log("client test: passed");
}

function assert(proposition, msg) {
    if (!proposition) {
        throw msg || "AssertionError";
    }
}

// await testClient(); 

async function postRestaurant(restaurant) {
    let r = await fetch("http://localhost:3000/api/restaurant/", {
        method: "POST",
        body: JSON.stringify(restaurant),
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await r.json();
}


async function postBusiness(business) {
    let r = await fetch("http://localhost:3000/api/business/", {
        method: "POST",
        body: JSON.stringify(business),
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await r.json();
}
async function postReview(review) {
    let r = await fetch("http://localhost:3000/api/review/", {
        method: "POST",
        body: JSON.stringify(review),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await r.json();
}
async function createItems() {
    let business = await postBusiness(MOCK_DATA.business);
    console.log(business);
    let restaurant = await postRestaurant(MOCK_DATA.restaurant);
    console.log(restaurant);
    let client = await postClient(MOCK_DATA.client);
    console.log(client);
    let review = await postReview(MOCK_DATA.review);
    console.log(review);
}
await createItems(); 