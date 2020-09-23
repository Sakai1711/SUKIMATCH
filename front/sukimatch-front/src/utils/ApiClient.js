import axios from "axios";


export const ApiClient = createAxiosInstance();
function createAxiosInstance() {
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'https://sukimatch-21753.herokuapp.com';
  axios.defaults.headers.get['Access-Control-Allow-Origin'] = 'https://sukimatch-21753.herokuapp.com';
  axios.defaults.headers.get['Access-Control-Allow-Credentials'] = true

  // axios.create でいきなり axios を呼んだ時に使われる通信部(AxiosInstance)がインスタンス化される
  const axiosInstance = axios.create({
    // この第一引数オブジェクトで設定を定義

    // axios で通信する時の URL の頭を決める。大体ドメインとAPI用URL接頭辞
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });

  // interceptors.request.use で送信時に引数に入れた関数が動作する
  axiosInstance.interceptors.request.use((request) => {
    // TODO: ログインが実装できたらセッションから取得する
    request.headers['access_token'] = `eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlNjYzOGY4NDlkODVhNWVkMGQ1M2NkNDI1MzE0Y2Q1MGYwYjY1YWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3VraW1hdGNoLTIxNzUzIiwiYXVkIjoic3VraW1hdGNoLTIxNzUzIiwiYXV0aF90aW1lIjoxNjAwODQxNjY4LCJ1c2VyX2lkIjoidllsRUF4bkg2bVE2RU5hSFhValVwSXVraHFuMiIsInN1YiI6InZZbEVBeG5INm1RNkVOYUhYVWpVcEl1a2hxbjIiLCJpYXQiOjE2MDA4NDE2NjgsImV4cCI6MTYwMDg0NTI2OCwiZW1haWwiOiJ0ZXN0NEBleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0NEBleGFtcGxlLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.q7uU0BqaasSSGGCSqPoCNhxmAnKCCws92Hzdef9jNEPAAjh192kAJcirqj5_BKWRGu7kpD0mlfiOEoj6BRoMtBMI7oHJj10gSCf8n2ey5jzSkrVqFbI5DYT12ueHYHbQOhAmYzqSexz1wwrq1eUaCiGkBsru-rzi8d7NIaNXJvjfaMruJHEcernJbI4KS3f5cZ0thhB08qaRVflOLz4KM5VilET9DhbIebsrEZgL1BtAqM7wFdviwWlyjp484coKIzHxbjHVFbBnJn0N4rBjTBcjWM9yFq0t2ekO-GH7ogpOcZVCSnAGGba-L9q02nknNTn0fApqCT1SlHnvXIarJA`

    // もし URL に APIトークンを増やすならば
    request.params = request.params || {};
    //request.params.apiToken = getApiToken();

    // リクエスト内容を見るならば
    console.dir(request)

    return request;
  })

  // interceptors.response.use で返信時に引数に入れた関数が動作する
  axiosInstance.interceptors.response.use(
    (response) => response, // 第一引数は通信成功時処理。受けた内容をそのまま通過
    (error) => { // 第二引数は通信失敗時処理
      alert('エラー発生')
    }
  )

  // interceptor で共通処理を追加した通信機能を返す。
  return axiosInstance;
}