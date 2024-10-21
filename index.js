const express = require('express');
const axios = require('axios');
const cors = require('cors');  // CORS 미들웨어 추가
const app = express();
const port = 3000;

// CORS 설정: 모든 도메인 허용
app.use(cors());

app.use(express.json());

// Kakao API 키 설정
const KAKAO_API_KEY = '592529aaa56864f907056d879ebc6dc3';

// 친구 목록 가져오기
app.post('/kakao/friends', async (req, res) => {
  const accessToken = req.body.accessToken; // 클라이언트에서 전달한 액세스 토큰

  try {
    const response = await axios({
      method: 'GET',
      url: 'https://kapi.kakao.com/v1/api/talk/friends',
      headers: {
        Authorization: `Bearer ${accessToken}` // 액세스 토큰 사용
      }
    });
    res.json(response.data); // 응답 데이터 반환
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch friends list' });
  }
});

// 메시지 전송
app.post('/kakao/send-message', async (req, res) => {
  const { accessToken, friendId, message, imageUrl } = req.body;

  try {
    const response = await axios({
      method: 'POST',
      url: 'https://kapi.kakao.com/v1/api/talk/friends/message/send',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      data: {
        receiver_uuids: [friendId],
        template_object: {
          object_type: 'text',
          text: message,
          link: {
            web_url: imageUrl,
            mobile_web_url: imageUrl
          }
        }
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
