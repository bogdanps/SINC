import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-dev-shm-usage')

driver = webdriver.Chrome(options=chrome_options)

driver.get("https://sinc.herokuapp.com/")

class AuthTest:
    def __init__(self):
        self.test_id = 0;
    
    # wrong username - login
    def test1(self):
        lgn_btn = driver.find_element(by=By.XPATH, value=self.btn_format.format("Login"))
        lgn_btn.click()
        time.sleep(3)

        input_email = driver.find_element(by=By.ID, value="formBasicEmail")
        input_email.send_keys("test1_wrong@sth.com")
        time.sleep(1)
        input_pass = driver.find_element(by=By.ID, value="formBasicPassword")
        input_pass.send_keys("sth")
        time.sleep(1)
        
        sbm_btn = driver.find_element(by=By.XPATH, value=self.btn_format.format("Submit"))
        sbm_btn.click()
        time.sleep(2)

        alert = driver.find_elements(by=By.XPATH, value="//div[@role='alert']")
        if len(alert):
            return True
        else:
            return False

    # wrong confirm pass - register
    def test2(self):
        reg_btn = driver.find_element(by=By.XPATH, value="//a[contains(text(), 'Register')]")
        reg_btn.click()
        time.sleep(3)

        input_name = driver.find_element(by=By.ID, value="name")
        input_name.send_keys("test2_wrong")
        time.sleep(1)
        input_email = driver.find_element(by=By.ID, value="formBasicEmail")
        input_email.send_keys("test2_wrong@sth.com")
        time.sleep(1)
    
        input_pass = driver.find_element(by=By.ID, value="formBasicPassword")
        input_pass.send_keys("sth")
        time.sleep(1)
        input_pass = driver.find_element(by=By.ID, value="confirmPassword")
        input_pass.send_keys("sth-diff")
        time.sleep(1)


        sbm_btn = driver.find_element(by=By.XPATH, value=self.btn_format.format("Register"))
        sbm_btn.click()
        time.sleep(3)
        alert = driver.find_elements(by=By.XPATH, value="//div[@role='alert']")
        if len(alert):
            return True
        else:
            return False

    def startTest(self):
        time.sleep(2)
        self.btn_format = '//button[contains(text(),"{}")]'
        test_results = list()
    
        #test1
        test_results.append(self.test1())
        #test2
        test_results.append(self.test2())

        print(test_results)
        if all(test_results):
            return True
        else:
            return False
        

# Run suite
test = AuthTest()
res = test.startTest()
if res:
    print("PASS")
else:
    print("FAIL")
driver.close()