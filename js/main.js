'use strict';

import { nameList } from './data.js';

const $footerForm = document.querySelector('.footer__form');
const $sentenceInput = document.querySelector('#sentence');
const $nameInput = document.querySelector('#name');
const $sentence = document.querySelector('.sentence');
const $name = document.querySelector('.name');
const $saveBtn = document.querySelector('#save');
const $shareBtn = document.querySelector('#share');

function init() {
  $sentence.textContent = $sentence.dataset.content;
  $name.textContent = $name.dataset.content;
}

function registerEventListeners() {
  $footerForm.addEventListener('submit', handleFormSubmit);
  $shareBtn.addEventListener('click', shareLink);
  $saveBtn.addEventListener('click', saveSentence);
}

function handleFormSubmit(e) {
  e.preventDefault();
  updateSentence();
  clearInputs();
}

function updateSentence() {
  $sentence.textContent = $sentenceInput.value;
  $name.textContent = $nameInput.value || makeRandomName();
}

function clearInputs() {
  $sentenceInput.value = '';
  $nameInput.value = '';
}

function makeRandomName() {
  const max = nameList.length;
  const i = Math.floor(Math.random() * max);
  return nameList[i];
}

function shareLink() {
  const currentUrl = window.location.href;
  navigator.clipboard.writeText(currentUrl).then(
    () => alert('URL이 클립보드에 복사되었습니다!'),
    err => console.error('URL 복사 실패', err)
  );
}

function saveSentence() {
  html2canvas(document.getElementById('capture')).then(canvas => {
    canvas.toBlob(blob => {
      if (navigator.share) {
        const file = new File([blob], 'capture.png', { type: 'image/png' });
        navigator
          .share({
            files: [file],
          })
          .then(() => console.log('Shared successfully'))
          .catch(error => console.log('Error sharing:', error));
      } else {
        fallbackDownload(blob);
      }
    }, 'image/png');
  });
}

function fallbackDownload(blob) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'capture.png';
  link.click();
}

init();
registerEventListeners();
