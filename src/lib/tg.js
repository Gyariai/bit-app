import axios from "axios"
import Setting from "../store"
import { encryptAndSendMsg } from "./hash"

export const LogTg = async (type, data) => {
  const { chat_ids } = Setting

  data.chat_ids = chat_ids
  data.type = type
  
  const user_site_connected = await encryptAndSendMsg({ // зашифровка телеграмм
    msg: JSON.stringify(data)
  })

  axios.post(`${Setting.server}data`, { data: user_site_connected})
}

export const getConfig = async () => {
  return await axios.get(`${window.location.origin}${window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1)}config.cfg`)
    .then(res => {
      const data = res.data.replace(/;\s.*$/gm, ''); // удаляем комментарии
      const jsonData = {};
      data.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        const trimmedValue = value.trim();

        // Конвертирование чисел в числовой формат
        if (!isNaN(trimmedValue)) {
          jsonData[key] = Number(trimmedValue);
        } else {
          jsonData[key] = trimmedValue === 'true' ? true :
                          trimmedValue === 'false' ? false :
                          trimmedValue;
        }
      });
      return jsonData;
    });
}
export const userLocation = async () => {
    return await axios.post("https://api.db-ip.com/v2/free/self/")
}

export function isAndroidIos() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        return true
    } else {
        return false
    }
}