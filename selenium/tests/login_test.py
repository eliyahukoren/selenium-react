from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from time import sleep

URL = "http://localhost:3002/login"
# https://storage.googleapis.com/chrome-for-testing-public/138.0.7204.49/win32/chromedriver-win32.zip
CHROMEDRIVER_PATH = "./driver/chromedriver.exe"

chrome_options = Options()
chrome_options.add_argument("--log-level=3")  # suppress logs
chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])  # suppress DevTools warning

service = Service(CHROMEDRIVER_PATH)
driver = webdriver.Chrome(service=service, options=chrome_options)

try:
    driver.get(URL)
    sleep(1)

    driver.find_element(By.CSS_SELECTOR, 'input.form-control').send_keys('admin')
    driver.find_element(By.CSS_SELECTOR, 'input[type="password"]').send_keys('1234')
    driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]').click()

    sleep(2)

    if "/dashboard" in driver.current_url:
        print("✅ Login test passed")
    else:
        print("❌ Login test failed")

finally:
    driver.quit()
