const categoriesAPI = "https://openapi.programming-hero.com/api/peddy/categories"
const allPetsAPI = "https://openapi.programming-hero.com/api/peddy/pets"

const fetchCategories = async () => {
    const response = await fetch(categoriesAPI);
    const {categories} = await response.json()
    return categories
}
const fetchByCategory = async (category) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    const {data} = await response.json()
    return data
}

const fetchAllPets = async () => {
    const response = await fetch(allPetsAPI);
    const {pets} = await response.json()
    return pets
}

const displayCategoriesButton = async () => {
    const categories = await fetchCategories()

    const categoriesDiv = document.getElementById("categories-div")
    categoriesDiv.innerHTML = ""

    categories.forEach((item) => {
        const button = document.createElement("button")
        button.className = "border border-gray-300 px-8 py-2 text-2xl font-semibold gap-4 rounded-xl flex w-40 lg:w-64 justify-center items-center";
        button.innerHTML = `<img src=${item.category_icon} alt=${item.category}> ${item.category}s`;
        button.id = `${item.id}`;
        button.type = "button";
        button.onclick = () => {
            document.querySelectorAll("button").forEach((btn) => {
                btn.classList.remove("bg-teal-700/30", "rounded-full", "border-2", "border-teal-700");
                btn.classList.add("rounded-xl");
            });
            displayPetsByCategory(item.category);
            button.classList.add("bg-teal-700/30", "rounded-full", "border-2", "border-teal-700");
            button.classList.remove("rounded-xl");
        };
        categoriesDiv.appendChild(button)

    })
}

const petCard = (pet) => `
            <div class="card max-w-96 bg-ba se-100 border">
                <figure class="p-4">
                    <img src="${pet.image}" alt="Pets" class="w-full rounded-md h-48 object-cover"/>
                </figure>
                <div class="card-body">
                    <h2 class="text-2xl font-bold">${pet.pet_name}</h2>
                    <div class="space-y-2">
                        <p class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z"/>
                            </svg>
                            Breed: ${pet.breed === undefined ? "Info missing" : `${pet.breed}`}
                        </p>
                        <p class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/>
                            </svg>
                            Birth: ${pet.date_of_birth === null || undefined ? "Info missing" :
    `${new Date(pet.date_of_birth).toLocaleDateString("en-us", {year: "numeric", month: "short", day: "numeric"})}`}                           
                            </p>
                        </p>
                        <p class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                            </svg>
                            Gender: ${pet.gender === undefined ? "Info missing" : `${pet.gender}`}
                        </p>
                        <p class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            Price: ${pet.price === null ? "Not available" : `${pet.price}$`}
                        </p>
                    </div>
                    <hr>
                    <div class="flex gap-2 justify-between mt-4 text-xl text-cyan-700 font-semibold">
                        <button  type="button" class="h-10 w-14 border rounded-lg border-cyan-700/20 flex items-center justify-center p-4  like-button" data-image="${pet.image}"">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5275 8.54163C6.19917 8.54163 6.805 8.16996 7.22 7.64163C7.86688 6.81631 8.67893 6.13511 9.60417 5.64163C10.2067 5.32163 10.7292 4.84496 10.9817 4.21246C11.159 3.76933 11.2501 3.29642 11.25 2.81913V2.29163C11.25 2.12587 11.3159 1.96689 11.4331 1.84968C11.5503 1.73247 11.7092 1.66663 11.875 1.66663C12.3723 1.66663 12.8492 1.86417 13.2008 2.2158C13.5525 2.56743 13.75 3.04435 13.75 3.54163C13.75 4.50163 13.5333 5.41079 13.1475 6.22329C12.9258 6.68829 13.2367 7.29163 13.7517 7.29163M13.7517 7.29163H16.3567C17.2117 7.29163 17.9775 7.86996 18.0683 8.72079C18.1058 9.07246 18.125 9.42913 18.125 9.79163C18.1284 12.0719 17.3492 14.2843 15.9175 16.0591C15.5942 16.4608 15.095 16.6666 14.58 16.6666H11.2333C10.8308 16.6666 10.43 16.6016 10.0475 16.475L7.4525 15.6083C7.07009 15.4811 6.66968 15.4164 6.26667 15.4166H4.92M13.7517 7.29163H11.875M4.92 15.4166C4.98917 15.5875 5.06417 15.7541 5.145 15.9183C5.30917 16.2516 5.08 16.6666 4.70917 16.6666H3.9525C3.21167 16.6666 2.525 16.235 2.30917 15.5266C2.02054 14.5793 1.87422 13.5944 1.875 12.6041C1.875 11.31 2.12084 10.0741 2.5675 8.93913C2.8225 8.29413 3.4725 7.91663 4.16667 7.91663H5.04417C5.4375 7.91663 5.665 8.37996 5.46084 8.71663C4.74908 9.88825 4.37369 11.2332 4.37584 12.6041C4.37584 13.5991 4.56917 14.5483 4.92084 15.4166H4.92Z" stroke="#131313" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                        </button>
                        <button type="button" onclick="petAdoptionButton()" class="px-4 h-10 border rounded-lg border-cyan-700/20">Adopt</button>
                        <button onclick="showPetDetails(${pet.petId})" id="details" type="button" class="px-4 h-10 border rounded-lg border-cyan-700/20">Details</button>
                    </div>
                </div>
            </div>
        `;

const displayAllPets = async () => {
    const pets = await fetchAllPets();
    const petsListDiv = document.getElementById("pets-list-div");
    const petsContainer = document.getElementById("pets-container");
    const likedPetsContainer = document.getElementById("liked-pets-container");
    const petsOuterContainer = document.getElementById("pets-outer-container");


    petsContainer.classList.add("hidden");

    petsOuterContainer.innerHTML = loader;

    setTimeout(() => {
        petsContainer.classList.remove("hidden");

        petsOuterContainer.innerHTML = '';
        petsOuterContainer.appendChild(petsContainer);
        petsListDiv.innerHTML = "";
        likedPetsContainer.classList.add("lg:block");

        pets.forEach(pet => {
            petsListDiv.innerHTML += petCard(pet);
        });

        document.querySelectorAll('.like-button').forEach(button => {
            button.addEventListener('click', handleLikeClick);
        });
    }, 2000);

}
const handleLikeClick = (event) => {
    const likedPetsDiv = document.getElementById("liked-pets-div")
    event.currentTarget.classList.add("bg-blue-400")
    console.log(event.currentTarget.dataset)
    likedPetsDiv.innerHTML += `<div class="flex p-4 h-32"><img src=${event.currentTarget.dataset.image} class="w-full rounded-md  object-cover" alt="fav pet image"> </div>`
}


const sortByPrice = async () => {
    const pets = await fetchAllPets()
    const petsListDiv = document.getElementById("pets-list-div")

    const sortedPets = pets.sort((a, b) => b.price - a.price);

    petsListDiv.innerHTML = "";

    sortedPets.forEach(pet => {
        petsListDiv.innerHTML += petCard(pet);
    });

    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', handleLikeClick);
    });
}

const sortButton = document.getElementById("sort-button")
sortButton.addEventListener("click", sortByPrice)

const noPetsCard = ` <div class="lg:col-span-3 rounded-2xl mx-4 py-10 bg-base-200 border min-h-[calc(100dvh-300px)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:mx-0 lg:max-w-none">
<div class="grid col-span-4 place-items-center">
 <div class="flex flex-col justify-center items-center">
 <img src="/no-info.png" class="w-1/2" alt="no info img">
 <h1 class="text-xl lg:text-5xl font-bold text-center mt-10">Sorry no information available</h1>
 <p class="px-4 text-lg pt-10 text-center">Check out other categories to find you next best friend.</p>
</div>
</div>


</div>`

const displayPetsByCategory = async (category) => {
    const pets = await fetchByCategory(category)
    const petsListDiv = document.getElementById("pets-list-div");
    const petsContainer = document.getElementById("pets-container");
    const likedPetsContainer = document.getElementById("liked-pets-container");
    const petsOuterContainer = document.getElementById("pets-outer-container");

    petsOuterContainer.innerHTML = loader;
    petsContainer.classList.add("hidden");
    petsListDiv.innerHTML = "";

    setTimeout(() => {
        petsContainer.classList.remove("hidden");
        petsOuterContainer.innerHTML = '';
        petsOuterContainer.appendChild(petsContainer);
        petsListDiv.innerHTML = "";
        likedPetsContainer.classList.add("lg:block");

        if (pets.length === 0) {
            petsListDiv.innerHTML = noPetsCard;
        }

        pets.map((pet) => {
            console.log(pet)
            petsListDiv.innerHTML += petCard(pet);
        })

        document.querySelectorAll('.like-button').forEach(button => {
            button.addEventListener('click', handleLikeClick);
        });

    }, 2000)
}


const loader = `
<div class="min-h-[calc(100vh-300px)] w-full flex justify-center items-center">
    <span class="loading loading-bars loading-lg"></span>
</div>`;


window.showPetDetails = async (petId) => {
    console.log(typeof petId)
    const modal = document.getElementById("my_modal_1");

    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const {petData: pet} = await response.json()

    modal.innerHTML = `
    <div class="modal-box">
        <div class="bg-white rounded-lg overflow-hidden">
            <div class="relative">
                <img src="${pet.image}" alt="${pet.pet_name}" class="w-full h-48 object-cover">
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-16"></div>
            </div>
            <div class="p-6">
                <h2 class="text-2xl font-bold mb-4">${pet.pet_name}</h2>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                        </svg>
                        <span class="text-sm text-gray-600">Breed: ${pet.breed || 'Info missing'}</span>
                    </div>
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span class="text-sm text-gray-600">Birth: ${pet.date_of_birth ? new Date(pet.date_of_birth).toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric"
    }) : 'Info missing'}</span>
                    </div>
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        <span class="text-sm text-gray-600">Gender: ${pet.gender || 'Info missing'}</span>
                    </div>
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span class="text-sm text-gray-600">Price: ${pet.price ? `${pet.price}$` : 'Not available'}</span>
                    </div>
                </div>
                <div class="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="text-sm text-gray-600">Vaccinated status: ${pet.vaccinated_status}</span>
                </div>
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-2">Details Information</h3>
                    <p class="text-sm text-gray-600">${pet.pet_details || 'No additional information available.'}</p>
                </div>
                <div class="modal-action">
                    <form method="dialog" class="w-full">
                        <button class="btn btn-block border border-cyan-700/25 text-cyan-700">Close</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;

    modal.showModal();
};


window.petAdoptionButton = () => {
    const modal2 = document.getElementById("my_modal_2");
    modal2.showModal();
    let countdown = 3;
    document.getElementById("countdown-display").innerText = countdown;
    const countdownInterval = setInterval(() => {
        if (countdown > 0) {
            countdown--;
            document.getElementById("countdown-display").innerText = countdown;
        } else {
            clearInterval(countdownInterval);
            modal2.close();
        }
    }, 1000);
}

displayAllPets()

displayCategoriesButton()