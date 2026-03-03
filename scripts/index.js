const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(data => displayLessons(data.data))
}
loadLessons();

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
    if(words.length == 0) {
        levelWordsContainer.innerHTML = `
        <div class="text-center col-span-full py-8 space-y-5">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-[#79716B] text-xl bangla-font">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-medium text-4xl bangla-font">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        return;
    };

    words.forEach(word => {
        // Get Container
        const wordsCard = document.createElement("div");
        wordsCard.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-15 px-5 space-y-4">
            <h2 class="text-2xl font-bold">${word.word? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <h2 class="text-2xl font-semibold bangla-font">"${word.meaning? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</h2>
            <div class="flex justify-between items-center">
                <button onclick="my_modal_1.showModal()" id="info-btn" class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]/50"><i class="fa-solid fa-circle-info"></i></button>
                <button id="vol-btn" class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]/50"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        levelWordsContainer.appendChild(wordsCard)
    })
}

