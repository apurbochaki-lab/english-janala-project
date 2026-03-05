const synonym = ['Hello', 'Hi', 'Bye'];
const noWord = [];

const createElement = (arr) => {

    if (arr.length == 0) {
        return `<p class="bangla-font text-gray-500">শব্দ পাওয়া যায়নি⚠️</p>`;
    }
    // console.log(noSynonyms.join(" "));


    const htmlElements = arr.map(ele => `<span class="btn bg-[#EDF7FF] text-[20px]">${ele}</span>`);
    console.log(htmlElements.join(" "));
}
createElement(synonym)
console.log(createElement(noWord))

