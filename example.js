// GitHub에 업로드할 자바스크립트 파일 (example.js)
document.getElementById('sendButton').addEventListener('click', () => {
  const friendName = document.getElementById('friendName').value;
  const message = document.getElementById('messageTitle').value;
  const imageUrl = document.getElementById('imageUrl').value;

  // 메시지 전송 로직
  console.log(`Send message to: ${friendName}, message: ${message}, image: ${imageUrl}`);
  
  // 추가 로직 필요 시 여기에 작성 (예: 데이터 처리, API 호출 등)
});
