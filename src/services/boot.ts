import axios from 'axios';
//import {FEATURE_ENABLED, APP_ID, PAT, MODEL_ID, MODEL_VERSION_ID, USER_ID} from '@env'


const PAT = '4e52edee75a642f5833d00d44be2382f';
const USER_ID = 'openai';
const APP_ID = 'chat-completion';
const MODEL_ID = 'gpt-4-vision-alternative';
const MODEL_VERSION_ID = '12b67ac2b5894fb9af9c06ebf8dc02fb';


export default  async function  smsData(sms: string): Promise<any>{
  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          text: {
            raw: sms,
          },
        },
      },
    ],
  });

  const headers = {
    'Accept': 'application/json',
    'Authorization': 'Key ' + PAT,
  };

  try {
    const response = await axios.post(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
      raw,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error('Erro durante a solicitação:', error);
    throw error; 
  }
};


