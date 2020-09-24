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