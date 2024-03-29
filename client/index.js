function onClickLi(e) {
    // 자동완성 단어 클릭 시 검색창에 해당 단어 표시
    const searchField = document.querySelector('#search-field');
    searchField.value = e.target.innerHTML;
}

function showAutocompleteWords(words) {
    const autocompleteList = document.querySelector('.autocomplete-results');

    // 자동완성 단어 리스트 클릭 이벤트 등록
    autocompleteList.addEventListener('click', onClickLi);

    // 자동완성 단어 리스트 보여주기
    autocompleteList.innerHTML = words.map(word => `<li>${word}</li>`).join("");
}

function onKeyUp(e) {
    // 서버에서 자동완성 단어 가져오기
    const word = e.target.value;
    fetch(`http://localhost:3000/autocomplete?keyword=${word}`)
    .then(res => {
        return res.json();
    })
    .then(autocompleteWords => {
        // 서버에서 가져온 자동완성 단어 그리기
        showAutocompleteWords(autocompleteWords);
    });
}

function main() {
    // 검색창 input에 onkeyup 함수 추가 (검색창의 단어가 바뀔때마다 호출)
    const searchField = document.querySelector('#search-field');
    searchField.addEventListener('keyup', onKeyUp);
}

document.addEventListener('DOMContentLoaded', main);