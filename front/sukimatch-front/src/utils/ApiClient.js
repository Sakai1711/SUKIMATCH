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
    if (sessionStorage.getItem('user_id')) {
      request.headers['user_id'] = sessionStorage.getItem('access_token')
    } else {
      // location.href
    }
<<<<<<< HEAD
=======
    //request.headers['user_id'] = `eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlNjYzOGY4NDlkODVhNWVkMGQ1M2NkNDI1MzE0Y2Q1MGYwYjY1YWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3VraW1hdGNoLTIxNzUzIiwiYXVkIjoic3VraW1hdGNoLTIxNzUzIiwiYXV0aF90aW1lIjoxNjAwODYzOTk2LCJ1c2VyX2lkIjoidllsRUF4bkg2bVE2RU5hSFhValVwSXVraHFuMiIsInN1YiI6InZZbEVBeG5INm1RNkVOYUhYVWpVcEl1a2hxbjIiLCJpYXQiOjE2MDA4NjM5OTYsImV4cCI6MTYwMDg2NzU5NiwiZW1haWwiOiJ0ZXN0NEBleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0NEBleGFtcGxlLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.ToV5d6BDrcecf5noZq32vc3ADH9R_xAo3hiMSNepPBEu72nDYUS5Rx14ijAU0a99XyiltJ8j0E-4Xc9XbELRswNlQrdHL-IWsQnxOpxxluToXBcWdcTyeFXlwmUPTScCYbSsuROAmW7DbX5kpEeSeCqJ_6GKXUBZDKf12To9iDvgjD-QSypWoky0IVmnvD8wygwilu8I_-sOqV091P92hP6eAQz_848FMC6yBE8CI4bRbKui_7IxGkhThaABhtll_3hyiOhdBXCBc_WSNBdCcuVrrU0l3axAY2iIKhivFQEfHKzm4jhhA6aayeLG09Rvv3yW37V4Ycm2CjksJXkbpA`
>>>>>>> ac358d16d5874750dab91da7fe479d5689e421ea

    // もし URL に APIトークンを増やすならば
    request.sparams = request.params || {};
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