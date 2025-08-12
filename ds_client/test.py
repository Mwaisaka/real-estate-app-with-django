# num = input("Enter a number:")

# if num == num[::-1]:
#     print(f'{num} is a palindrome.')
# else:
#     print(f'{num} is not a palindrome.')

# import calendar
# yy = 2025
# mm = 8

# print(calendar.month(yy,mm))

# !/usr/bin/env python3

# def greet(name):
#     print(f'Hello, {name}. Welcome back!')

# if __name__ =="__main__":
#     name=input("Enter your name : ")
#     greet(name)

# import requests
# from bs4 import BeautifulSoup

# url = "https://example.com"
# response = requests.get(url)
# soup = BeautifulSoup(response.text, 'html.parser')

# print(soup.title.text)

# import time, schedule

# def job():
#     print("Doing the task...")
# schedule.every(10).seconds.do(job)

# while True:
#     schedule.run_pending()
#     time.sleep(1)

# import requests

# url = "https://v2.jokeapi.dev/joke/Any"

# #sending a GET request to the API
# response = requests.get(url)

# #Checking if the requests are successful
# if response.status_code == 200:
#     joke_data=response.json()
#     # print(joke['joke'])
#     # Check if it's a single-part joke
#     if joke_data.get("type") == "single":
#         print(joke_data["joke"])
#     # Otherwise, it's a two-part joke
#     elif joke_data.get("type") == "twopart":
#         print(joke_data["setup"])
#         print(joke_data["delivery"])
#     else:
#         print("Unexpected joke format.")
# else:
#     print("Oops! Something went wrong.")

