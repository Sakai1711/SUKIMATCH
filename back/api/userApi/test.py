import requests

def test_api(api_url):
    request_param = {
        'param': 0
    }
    res = requests.delete(api_url, json=request_param)
    print(res)

if __name__ == "__main__":
    api_url = "http://localhost:5000/user/:id"
    test_api(api_url)