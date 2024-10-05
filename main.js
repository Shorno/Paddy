const categoriesAPI = "https://openapi.programming-hero.com/api/peddy/categories"


const fetchCategories = async () => {
    const response = await fetch(categoriesAPI);
    const {categories} = await response.json()
    return categories
}

const displayCategoriesButton = async () => {
    const categories = await fetchCategories()

    const categoriesDiv = document.getElementById("categories-div")
    categoriesDiv.innerHTML = ""

    categories.map((item) => {
        const button = document.createElement("button")
        button.className = "border border-gray-300 px-8 py-2 text-2xl font-semibold gap-4 rounded-lg flex w-40 lg:w-64 justify-center items-center"
        button.innerHTML = ` <img src=${item.category_icon} alt=${item.category}> ${item.category}s`
        button.id = `${item.id}`
        button.type = "button"
        categoriesDiv.appendChild(button)
    })
}
displayCategoriesButton()