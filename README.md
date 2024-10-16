# 📝 명언 제조기

[![명언 제조기 이미지](https://sanggusseu.github.io/make-quote/images/og-image.jpg)](https://quote-maker.org)

## ✨ 프로젝트 소개

- HTML, CSS, JavaScript를 학습한 후 처음으로 진행한 프로젝트로, 사용자가 문장과 이름을 입력하면 명언처럼 보이는 이미지를 생성하고 공유할 수 있는 웹사이트입니다.
- 이 프로젝트를 통해 **크로스 브라우징 문제 해결**과 **사용자 경험 개선**의 중요성을 배웠습니다.

## 🛠 사용한 기술

- **HTML** - 웹 페이지 구조를 구성하는 데 사용되었습니다.
- **CSS** - 웹 페이지의 스타일을 적용하는 데 사용되었습니다.
- **JavaScript** - 사용자 인터랙션 및 기능 구현을 위해 사용되었습니다.
- **html2canvas** - DOM 요소를 캡쳐하여 이미지를 생성하는 데 사용되었습니다.

## 📌 이슈

- iOS 카카오톡 인앱 브라우저에서 파일 다운로드가 되지 않음.
- 안드로이드에서도 종종 메시지만 뜨고 파일 다운로드가 되지 않음.
- 직관적이지 않은 UI로 인해 사용자의 70%가 사용법을 묻는 문제

## ✨ 해결 및 성과

- 인앱 브라우저에서 외부 브라우저로 연결하여, iOS에서도 다운로드가 가능하도록 문제 해결
- UI 개선을 통해 사용자 문의 비율을 70%에서 10~20%로 감소

## 📚 배운 점

- 크로스 브라우징 문제를 직접 해결하면서, 다양한 환경에서 일관된 사용자 경험을 제공하는 방법을 학습
- 사용자 피드백을 반영한 UI/UX 개선의 중요성을 체감

## 🚀 주요 기능

- **이미지 생성 및 공유**: `html2canvas`를 이용해 사용자가 입력한 문장을 이미지로 저장하고, 브라우저가 공유 기능을 지원하면 이미지를 공유할 수 있는 기능을 구현했습니다. 지원하지 않는 경우에는 이미지 저장 기능을 제공합니다.

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

- **브라우저 감지 및 외부 브라우저 연결 기능**: iOS 카카오톡 인앱 브라우저의 다운로드 문제를 해결하기 위해 외부 브라우저로 연결하는 기능을 구현했습니다. 이후 안드로이드에서도 유사한 문제가 발생해, iOS와 안드로이드 모두 브라우저를 감지한 후 외부 브라우저로 자동으로 이동하도록 개선했습니다.

  ```javascript
  let executeWhenDOMReady = callback => {
    if (document.readyState !== 'loading') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  };
  executeWhenDOMReady(() => {
    let userAgent = navigator.userAgent.toLowerCase();
    let currentUrl = location.href;

    if (userAgent.match(/kakaotalk/i)) {
      location.href =
        'kakaotalk://web/openExternal?url=' + encodeURIComponent(currentUrl);
    } else if (userAgent.match(/line/i)) {
      if (currentUrl.indexOf('?') !== -1) {
        location.href = currentUrl + '&openExternalBrowser=1';
      } else {
        location.href = currentUrl + '?openExternalBrowser=1';
      }
    } else if (
      userAgent.match(
        /inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone(.*)whale|android(.*)whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|trill\/[^1]/i
      )
    ) {
      if (!userAgent.match(/iphone|ipad|ipod/i)) {
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
