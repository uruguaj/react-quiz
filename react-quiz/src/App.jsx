import { useState } from 'react'
import './App.css'
import { Button, Input, Form } from "antd";

function App() {

    const [form] = Form.useForm();
    const [buttonEnabled, setButtonEnabled] = useState(null)
    const [captcha, setCaptcha] = useState(Math.floor(Math.random() * 6))
    console.log(captcha)
    const startQuiz = () => {
        alert('Quiz is not ready!')
        setButtonEnabled(null)
    }
    const handleFinish = (values) => {
        if (values.captcha == 10) {
            setButtonEnabled(true)
            return null;
        } else {

            alert( `Captcha is wrong . You submitted ${values.captcha}`)
            return null;
        }
    }


  return (
    <>
      <div className="title">
        <h1>Welcome to my <span>Quiz</span> (open source)</h1>
          {buttonEnabled === null &&
              <div>
                  <h2 ><span
                      className='captcha-title-unsolved'
                  > Are you a robot? Solve captcha :
                  </span>
                      {captcha === 0  &&
                      <Form
                          form={form}
                          onFinish={handleFinish}
                          style={{
                          }}
                      >
                          <Form.Item
                              name="captcha"
                              rules={[{
                                  required: true,
                                  message: "Please solve captcha!"
                              }]}
                          >
                              <Input
                                  style={{ backgroundColor: "#fff", color: "#333" }}
                                  placeholder='Solve captcha 5+5'
                              />
                          </Form.Item>

                          <Form.Item
                              style={{ textAlign: "center" }}
                          >
                              <Button
                                  type="primary"
                                  style={{ backgroundColor: "#333", borderColor: "#333" }}
                                  className='antd-button-submit-captcha'
                                  htmlType="submit"
                              >
                                  Submit
                              </Button>
                          </Form.Item>
                      </Form>

                  }{captcha > 0 && setButtonEnabled(true)}
                  </h2>
              </div>

          }
          {buttonEnabled === true &&
              <Button
                  className='antd-button-start'
                  onClick={startQuiz} >
                  Start quiz!
              </Button>
          }
      </div>
    </>
  )
}

export default App
