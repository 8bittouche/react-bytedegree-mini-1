function onClickLi(e) {
    e.preventDefault();
    e.stopPropagation();

    // 자동완성 단어 클릭 시 검색창에 해당 단어 표시
    const searchField = document.querySelector('#search-field');
    searchField.value = e.target.innerHTML;
}

function showAutocompleteWords(words) {
    const autocompleteList = document.querySelector('.autocomplete-results');

    // ul tag의 모든 자식 노드 제거
    while(autocompleteList.firstChild) {
        autocompleteList.removeChild(autocompleteList.firstChild);
    }

    // ul tag에 자동완성 단어 추가 (li tag)
    words.forEach(word => {
        const li = document.createElement('li');
        li.innerHTML = word;
        li.onclick = onClickLi;
        autocompleteList.appendChild(li);
    });
}

async function onKeyUp(e) {
    e.preventDefault();
    e.stopPropagation();

    // 서버에서 자동완성 단어 가져오기
    const word = e.target.value;
    await fetch(`http://localhost:3000/autocomplete?keyword=${word}`)
    .then(res => {
        return res.json();
    })
    .then(autocompleteWords => {
        // 가져온 자동완성 단어 그리기
        showAutocompleteWords(autocompleteWords);
    });
}

function main() {
    // 검색창 input에 onkeyup 함수 추가 (검색창의 단어가 바뀔때마다 호출)
    const searchField = document.querySelector('#search-field');
    searchField.onkeyup = onKeyUp;
}

document.addEventListener('DOMContentLoaded', main);