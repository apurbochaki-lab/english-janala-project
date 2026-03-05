const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(data => displayLessons(data.data))
}
loadLessons();

// Loading Effect
const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner-container").classList.remove("hidden")
        document.getElementById("level-words-container").classList.add("hidden")
    } else {
        document.getElementById("level-words-container").classList.remove("hidden")
        document.getElementById("spinner-container").classList.add("hidden")
    }
}

// Text to Speech
function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}

// Show Lessons -$ named buttons
const displayLessons = (lessons) => {
    // 1. Get the container & make empty
    let levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = "";

    // 2. Get into every lessons
    for (let lesson of lessons) {
        // console.log(lesson.level_no)
        // 3. Create Element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary font-bold lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}</button>
        `
        // 4. Append into container
        levelContainer.appendChild(btnDiv);

    }
}

const removeActive = () => {
    const lessonBtn = document.querySelectorAll(".lesson-btn");
    lessonBtn.forEach(btn => btn.classList.remove("active"));
}


const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // Lesson btns highlight feature
            removeActive()
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            clickBtn.classList.add("active")

            displayLevelWord(data.data)
        })
}
const displayLevelWord = (words) => {
    // Get container
    const levelWordsContainer = document.getElementById("level-words-container");
    levelWordsContainer.innerHTML = "";

    // Empty Lesson condition
    if (words.length == 0) {
        levelWordsContainer.innerHTML = `
        <div class="text-center col-span-full py-8 space-y-5">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-[#79716B] text-xl bangla-font">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-medium text-4xl bangla-font">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        manageSpinner(false);
        return;
    };

    words.forEach(word => {
        // Get Container
        // console.log(word.id)
        const wordsCard = document.createElement("div");
        wordsCard.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-15 px-5 space-y-4">
            <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <h2 class="text-2xl font-semibold bangla-font">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</h2>
            <div class="flex justify-between items-center">

                <button onclick="loadWordsDetail(${word.id})" class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]/50"><i class="fa-solid fa-circle-info"></i></button>

                <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]/50"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        levelWordsContainer.appendChild(wordsCard)
    })
    manageSpinner(false);
}

// Synonym Showing Logic
const createElement = (arr) => {
    if (arr.length == 0) {
        return `<p class="bangla-font bangla-font">সমার্থক শব্দ পাওয়া যায়নি</p>`;
    }
    const htmlElements = arr.map(ele => `<span class="btn bg-[#EDF7FF] text-[20px]">${ele}</span>`);
    return (htmlElements.join(" "));
};

// Show Modal when click in info button of cards
const loadWordsDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordsDetail(details.data);

}
const displayWordsDetail = (details) => {
    // console.log(details)

    const wordModal = document.getElementById("details-container");
    wordModal.innerHTML = `
    
                <div class="text-2xl font-bold">
                    <h2>${details.word ? details.word : "শব্দ পাওয়া যায়নি⚠️"} (<i class="fa-solid fa-microphone-lines"></i> : <span class="bangla-font">${details.pronunciation ? details.pronunciation : "উচ্চারণ পাওয়া যায়নি⚠️"}</span>)
                    </h2>
                </div>

                <div class="space-y-1">
                    <p class="font-semibold text-[20px]">Meaning</p>
                    <p class="font-medium text-[20px] bangla-font">${details.meaning ? details.meaning : "অর্থ পাওয়া যায়নি⚠️"}</p>
                </div>

                <div class="space-y-1">
                    <p class="font-semibold text-[20px]">Example</p>
                    <p class="text-[20px]">${details.sentence ? details.sentence : "বাক্য পাওয়া যায়নি⚠️"}</p>
                </div>

                <div class="space-y-2">
                    <h2 class="font-semibold bangla-font text-[20px]">সমার্থক শব্দ গুলো</h2>
                    <div class="flex gap-2 flex-col md:flex-row">${createElement(details.synonyms)}</div>
                </div>
    `

    document.getElementById("word_modal").showModal();
}



// Search functionality
document.getElementById("search-btn").addEventListener("click", () => {
    const serachInput = document.getElementById("search-input");
    const searchValue = serachInput.value.trim().toLowerCase();
    // console.log(searchValue)

    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(data => {
            const allWords = data.data;
            const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue))
            // console.log(filterWords)
            displayLevelWord(filterWords);
            removeActive()
            serachInput.value = ""
        })
})