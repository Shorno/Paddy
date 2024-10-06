const categoriesAPI = "https://openapi.programming-hero.com/api/peddy/categories"
const allPetsAPI = "https://openapi.programming-hero.com/api/peddy/pets"
const singleCategoryPetAPI = "https://openapi.programming-hero.com/api/peddy/category/"

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
        button.className = "border border-gray-300 px-8  py-2 text-2xl font-semibold gap-4 rounded-lg flex w-40 lg:w-64 justify-center items-center"
        button.innerHTML = ` <img src=${item.category_icon} alt=${item.category}> ${item.category}s`
        button.id = `${item.id}`
        button.type = "button"
        button.onclick = () => displayPetsByCategory(item.category)
        categoriesDiv.appendChild(button)
    })
}

const petCard = (pet) => `
            <div class="card max-w-96 bg-base-100 border">
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
                        <button onclick="handleLikeClick()" type="button" class="h-10 w-14 border rounded-lg border-cyan-700/20 flex items-center justify-center p-4 like-button" data-pet-id="${pet.image}" id="${pet.image}">
                            <img src="/like-icon.png" alt="like-icon">
                        </button>
                        <button type="button" class="px-6 h-10 border rounded-lg border-cyan-700/20">Adopt</button>
                        <button type="button" class="px-6 h-10 border rounded-lg border-cyan-700/20">Details</button>
                    </div>
                </div>
            </div>
        `;

const displayAllPets = async () => {
    const pets = await fetchAllPets()
    const petsListDiv = document.getElementById("pets-list-div")
    petsListDiv.innerHTML = "";

    pets.forEach(pet => {
        petsListDiv.innerHTML += petCard(pet);
    });

    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', handleLikeClick);
    });

}
const handleLikeClick = (event) => {
    console.log("Like button clicked for pet:", event.currentTarget.dataset.petId);
    const likedPetsDiv = document.getElementById("liked-pets-div")
    likedPetsDiv.innerHTML += `<div class="flex p-4 h-32"><img src=${event.currentTarget.dataset.petId} class="w-full rounded-md  object-cover"> </div>`
}


const sortByPrice = async () => {
    console.log("sort button clicked")
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


const displayPetsByCategory = async (category) => {
    const pets = await fetchByCategory(category)
    const petsListDiv = document.getElementById("pets-list-div")
    petsListDiv.innerHTML = "";

    pets.map((pet) => {
        petsListDiv.innerHTML += petCard(pet);
    })
}


displayAllPets()

displayCategoriesButton()