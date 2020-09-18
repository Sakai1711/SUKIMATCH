import requests

def test_api(api_url):
    request_param = {
        "username": "gafa",
        "email" : "example@email.msg",
        "password" : "splatoon"
    }
    res = requests.post(api_url, json=request_param)
    print(res.json())

if __name__ == "__main__":
    api_url = "http://localhost:5000/user"
    test_api(api_url)