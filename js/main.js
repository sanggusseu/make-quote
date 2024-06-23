'use strict';

import { nameList } from './data.js';

const $footerForm = document.querySelector('.footer__form');
const $sentenceInput = document.querySelector('#sentence');
const $nameInput = document.querySelector('#name');
const $section = document.querySelector('.section');
const $sentence = document.querySelector('.sentence');
const $name = document.querySelector('.name');
const $saveBtn = document.querySelector('#save');
const $shareBtn = document.querySelector('#share');

$footerForm.addEventListener('submit', e => {
  e.preventDefault();
  $sentence.textContent = $sentenceInput.value;
  $name.textContent = $nameInput.value || makeRandomName();
  $sentenceInput.value = '';
  $nameInput.value = '';
});

$shareBtn.addEventListener('click', shareLink);

function makeRandomName() {
  const max = nameList.length;
  const i = Math.floor(Math.random() * max);
  return nameList[i];
}

function shareLink() {
  const currentUrl = window.location.href;
  navigator.clipboard.writeText(currentUrl).then(
    function () {
      alert('URL이 클립보드에 복사되었습니다!');
    },
    function (err) {
      console.error('URL 복사 실패', err);
    }
  );
}

function saveSentence() {
  html2canvas(document.getElementById('capture')).then(function (canvas) {
    // 캔버스를 이미지로 변환
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'capture.png';
    link.click();
  });
}

$saveBtn.addEventListener('click', saveSentence);