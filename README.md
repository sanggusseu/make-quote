# 📝 명언 제조기

[![명언 제조기 이미지](https://sanggusseu.github.io/make-quote/images/og-image.jpg)](https://sanggusseu.github.io/make-quote/)

## ✨ 프로젝트 소개

- HTML, CSS, JavaScript를 학습한 후 처음으로 진행한 프로젝트로, 사용자가 문장과 이름을 입력하면 명언처럼 보이는 이미지를 생성하고 공유할 수 있는 웹사이트입니다.
- 이 프로젝트를 통해 **크로스 브라우징 문제 해결**과 **사용자 경험 개선**의 중요성을 배웠습니다.

## 🛠 사용한 기술

- **HTML** - 웹 페이지 구조를 구성하는 데 사용되었습니다.
- **CSS** - 웹 페이지의 스타일을 적용하는 데 사용되었습니다.
- **JavaScript** - 사용자 인터랙션 및 기능 구현을 위해 사용되었습니다.
- **html2canvas** - DOM 요소를 캡쳐하여 이미지를 생성하는 데 사용되었습니다.

## 📚 학습 내용 및 구현 기능

- **크로스 브라우징 문제 해결**: 다양한 브라우저 환경에서의 호환성 문제를 직접 해결하며, 사용자 경험을 개선했습니다.
- **UI/UX 개선**: 사용자 피드백을 반영하여 인터페이스를 개선하고, 사용자 문의 비율을 크게 줄였습니다.

## 🚀 주요 기능

- **이미지 생성 및 공유**: 사용자가 입력한 문장을 이미지로 저장하고, 브라우저의 공유 기능을 활용하여 이미지를 공유할 수 있습니다. 지원하지 않는 경우에는 다운로드 기능이 제공됩니다.

  ```javascript
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
  ```

- **브라우저 감지 및 외부 브라우저 우회 기능**: iOS 카카오톡 인앱 브라우저에서 파일 다운로드 문제를 해결하기 위해 사용자를 외부 브라우저로 이동시키는 기능을 구현했습니다.

  ```javascript
  let inappdeny_exec_vanillajs = callback => {
    if (document.readyState !== 'loading') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  };
  inappdeny_exec_vanillajs(() => {
    let useragt = navigator.userAgent.toLowerCase();
    let target_url = location.href;

    if (useragt.match(/kakaotalk/i)) {
      location.href =
        'kakaotalk://web/openExternal?url=' + encodeURIComponent(target_url);
    } else if (useragt.match(/line/i)) {
      if (target_url.indexOf('?') !== -1) {
        location.href = target_url + '&openExternalBrowser=1';
      } else {
        location.href = target_url + '?openExternalBrowser=1';
      }
    } else if (
      useragt.match(
        /inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone(.*)whale|android(.*)whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|trill\/[^1]/i
      )
    ) {
      if (!useragt.match(/iphone|ipad|ipod/i)) {
        return;
      }
      let mobile = document.createElement('meta');
      mobile.name = 'viewport';
      mobile.content =
        'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui';
      document.getElementsByTagName('head')[0].appendChild(mobile);
      let fonts = document.createElement('link');
      fonts.href =
        'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap';
      document.getElementsByTagName('head')[0].appendChild(fonts);
      document.body.innerHTML =
        "<style>body{margin:0;padding:0;font-family: 'Noto Sans KR', sans-serif;overflow: hidden;height: 100%;}</style><h2 style='padding-top:50px; text-align:center;font-family: 'Noto Sans KR', sans-serif;'>인앱브라우저 호환문제로 인해<br />Safari로 접속해야합니다.</h2><article style='text-align:center; font-size:17px; word-break:keep-all;color:#999;'>아래 버튼을 눌러 Safari를 실행해주세요<br />Safari가 열리면, 주소창을 길게 터치한 뒤,<br />'붙여놓기 및 이동'을 누르면<br />정상적으로 이용할 수 있습니다.<br /><br /><button onclick='inappbrowserout();' style='min-width:180px;margin-top:10px;height:54px;font-weight: 700;background-color:#31408E;color:#fff;border-radius: 4px;font-size:17px;border:0;'>Safari로 열기</button></article><img style='width:70%;margin:50px 15% 0 15%' src='https://tistory3.daumcdn.net/tistory/1893869/skin/images/inappbrowserout.jpeg' />";
    }
  });
  ```

## 🎓 배운 점

- **다양한 환경에서의 일관된 사용자 경험 제공**: 크로스 브라우징 문제 해결을 통해 다양한 환경에서의 일관된 사용자 경험을 제공하는 방법을 배웠습니다.
- **UI/UX 개선의 중요성**: 사용자 피드백을 반영하여 UI/UX를 개선하는 과정에서 사용자 경험의 중요성을 체감했습니다.
