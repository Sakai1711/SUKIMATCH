import requests

def test_api(api_url):
    request_param = {
        "password": "hoge",
        "is_delete" : True
    }
    res = requests.post(api_url, json=request_param)
    print(res.json())

if __name__ == "__main__":
    api_url = "http://localhost:5000/user/:id"
    test_api(api_url)