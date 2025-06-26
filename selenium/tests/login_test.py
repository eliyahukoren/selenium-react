from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from time import sleep
import os
import platform
from selenium.webdriver.chrome.service import Service

# Detect OS
is_windows = platform.system() == "Windows"
# Set path to local chromedriver
# https://storage.googleapis.com/chrome-for-testing-public/138.0.7204.49/win32/chromedriver-win32.zip
if is_windows:
    chromedriver_path = "./driver/chromedriver.exe"
    service = Service(chromedriver_path)
else:
    service = Service()  # use chromedriver from PATH (for example installed via apt)

# Read target URL from environment or fallback to localhost
base_url = os.getenv("TARGET_HOST", "http://localhost:3002")
URL = f"{base_url}/login"

chrome_options = Options()
chrome_options.add_argument("--log-level=3")  # suppress logs
chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])  # suppress DevTools warning

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
